const db = require('../config/db');

// --- CREAR CONTRATO ---
const crearContrato = async (req, res) => {
    // 1. Agregamos monto_alquiler a la desestructuración
    const { 
        inquilino_id, 
        unidad_id, 
        monto_alquiler, // <--- NUEVO
        monto_internet_fijo, 
        dia_pago_mensual, 
        fecha_inicio, 
        fecha_fin 
    } = req.body;
    
    try {
        await db.query('BEGIN');

        // 2. Agregamos la columna monto_alquiler al INSERT y el parámetro $8
        const queryContrato = `
            INSERT INTO contratos (
                inquilino_id, unidad_id, monto_alquiler, monto_internet_fijo, 
                dia_pago_mensual, fecha_inicio, fecha_fin, activo
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
        
        const valuesContrato = [
            parseInt(inquilino_id),
            parseInt(unidad_id),
            parseFloat(monto_alquiler) || 0,        // <--- NUEVO: Captura el alquiler
            parseFloat(monto_internet_fijo) || 0,
            parseInt(dia_pago_mensual),
            fecha_inicio,
            fecha_fin === "" ? null : fecha_fin,
            true
        ];

        const nuevoContrato = await db.query(queryContrato, valuesContrato);

        // 3. Marcar la unidad como OCUPADA
        await db.query('UPDATE unidades SET estado = $1 WHERE id = $2', ['ocupado', parseInt(unidad_id)]);

        await db.query('COMMIT');
        res.status(201).json(nuevoContrato.rows[0]);
    } catch (error) {
        await db.query('ROLLBACK');
        console.error("DETALLE DEL ERROR EN EL BACKEND:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// --- OBTENER CONTRATOS (GET) ---
const getContratos = async (req, res) => {
    try {
        const query = `
            SELECT c.*, 
                   i.nombre || ' ' || i.apellido as inquilino_nombre, 
                   u.nombre_nro as unidad_nombre,
                   p.nombre as edificio_nombre
            FROM contratos c
            JOIN inquilinos i ON c.inquilino_id = i.id
            JOIN unidades u ON c.unidad_id = u.id
            JOIN propiedades p ON u.propiedad_id = p.id
            ORDER BY c.id DESC`;
        const resultado = await db.query(query);
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- ACTUALIZAR (PUT) ---
const actualizarContrato = async (req, res) => {
    const { id } = req.params;
    const { inquilino_id, unidad_id, monto_internet_fijo, dia_pago_mensual, fecha_inicio, fecha_fin, activo } = req.body;
    try {
        const query = `
            UPDATE contratos 
            SET inquilino_id=$1, unidad_id=$2, monto_internet_fijo=$3, dia_pago_mensual=$4, fecha_inicio=$5, fecha_fin=$6, activo=$7
            WHERE id=$8 RETURNING *`;
        const values = [
            parseInt(inquilino_id), 
            parseInt(unidad_id), 
            parseFloat(monto_internet_fijo), 
            parseInt(dia_pago_mensual), 
            fecha_inicio, 
            fecha_fin === "" ? null : fecha_fin, 
            activo, 
            id
        ];
        const resultado = await db.query(query, values);
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- ELIMINAR (DELETE) ---
const eliminarContrato = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('BEGIN');
        const contrato = await db.query('SELECT unidad_id FROM contratos WHERE id = $1', [id]);
        if (contrato.rows.length > 0) {
            const unidadId = contrato.rows[0].unidad_id;
            await db.query('UPDATE unidades SET estado = $1 WHERE id = $2', ['disponible', unidadId]);
        }
        await db.query('DELETE FROM contratos WHERE id = $1', [id]);
        await db.query('COMMIT');
        res.status(200).json({ mensaje: "Contrato eliminado y unidad liberada" });
    } catch (error) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: error.message });
    }
};

// --- OBTENER UN SOLO CONTRATO POR ID ---
const getContratoById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT c.*, 
                   i.nombre || ' ' || i.apellido as inquilino_nombre, 
                   u.nombre_nro as unidad_nombre
            FROM contratos c
            JOIN inquilinos i ON c.inquilino_id = i.id
            JOIN unidades u ON c.unidad_id = u.id
            WHERE c.id = $1`;
        const resultado = await db.query(query, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: "Contrato no encontrado" });
        }

        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearContrato,
    getContratos,
    actualizarContrato,
    eliminarContrato,
    getContratoById
};