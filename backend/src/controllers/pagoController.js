const db = require('../config/db');

const registrarPagoMensual = async (req, res) => {
    const { contrato_id, mes, anio, luz_variable, agua_variable, otros_extra } = req.body;

    try {
        // 1. Buscamos los montos fijos del contrato y la unidad vinculada
        const infoQuery = `
            SELECT c.monto_internet_fijo, u.precio_base 
            FROM contratos c
            JOIN unidades u ON c.unidad_id = u.id
            WHERE c.id = $1`;
        
        const info = await db.query(infoQuery, [contrato_id]);

        if (info.rows.length === 0) {
            return res.status(404).json({ mensaje: "Contrato no encontrado" });
        }

        const { precio_base, monto_internet_fijo } = info.rows[0];

        // 2. Calculamos el total (Lógica de negocio)
        const total = parseFloat(precio_base) + 
                      parseFloat(monto_internet_fijo) + 
                      parseFloat(luz_variable || 0) + 
                      parseFloat(agua_variable || 0) + 
                      parseFloat(otros_extra || 0);

        // 3. Insertamos el pago
        const queryPago = `
            INSERT INTO pagos (
                contrato_id, mes_correspondiente, anio_correspondiente, 
                monto_alquiler_fijo, monto_luz_variable, monto_agua_variable, 
                monto_internet_fijo, monto_otros_extra, total_pagado, esta_pagado
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true) RETURNING *`;

        const valores = [
            contrato_id, mes, anio, 
            precio_base, luz_variable, agua_variable, 
            monto_internet_fijo, otros_extra, total
        ];

        const resultado = await db.query(queryPago, valores);

        res.status(201).json({
            mensaje: "Pago registrado exitosamente",
            detalle: resultado.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al procesar el pago", error: error.message });
    }
};


const obtenerEstadoCuenta = async (req, res) => {
    const { contrato_id } = req.params;
    try {
        const query = `
            SELECT p.*, i.nombre, i.apellido, u.nombre_nro as unidad
            FROM pagos p
            JOIN contratos c ON p.contrato_id = c.id
            JOIN inquilinos i ON c.inquilino_id = i.id
            JOIN unidades u ON c.unidad_id = u.id
            WHERE p.contrato_id = $1
            ORDER BY p.anio_correspondiente DESC, p.mes_correspondiente DESC`;
        
        const resultado = await db.query(query, [contrato_id]);
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registrarPagoMensual };