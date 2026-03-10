const db = require('../config/db');

// 1. Obtener todos los pagos
const getPagos = async (req, res) => {
    try {
        const query = `
            SELECT p.*, i.nombre || ' ' || i.apellido as inquilino_nombre, u.nombre_nro as unidad_nombre
            FROM pagos p
            JOIN contratos c ON p.contrato_id = c.id
            JOIN inquilinos i ON c.inquilino_id = i.id
            JOIN unidades u ON c.unidad_id = u.id
            ORDER BY p.id DESC`;
        const resultado = await db.query(query);
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Crear el pago
const crearPago = async (req, res) => {
    const { contrato_id, mes, anio, alquiler, internet, luz, agua, otros, total } = req.body;
    try {
        const query = `
            INSERT INTO pagos (
                contrato_id, mes_correspondiente, anio_correspondiente, 
                monto_alquiler_fijo, monto_internet_fijo, 
                monto_luz_variable, monto_agua_variable, 
                monto_otros_extra, total_pagado
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
        const values = [contrato_id, mes, anio, alquiler, internet, luz, agua, otros, total];
        const nuevo = await db.query(query, values);
        res.status(201).json(nuevo.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Confirmar el pago
const confirmarPago = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE pagos SET esta_pagado = true, fecha_pago_realizado = NOW() WHERE id = $1', [id]);
        res.status(200).json({ mensaje: "Pago confirmado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- IMPORTANTE: EXPORTAR LAS TRES ---
module.exports = { 
    getPagos, 
    crearPago, 
    confirmarPago 
};