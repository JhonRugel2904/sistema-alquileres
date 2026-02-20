const db = require('../config/db');

const crearContrato = async (req, res) => {
    const { inquilino_id, unidad_id, monto_internet_fijo, dia_pago_mensual, fecha_inicio } = req.body;

    try {
        // Iniciamos una transacción para asegurar que ambos cambios ocurran
        await db.query('BEGIN');

        // 1. Insertar el contrato
        const queryContrato = `
            INSERT INTO contratos (inquilino_id, unidad_id, monto_internet_fijo, dia_pago_mensual, fecha_inicio)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const valores = [inquilino_id, unidad_id, monto_internet_fijo, dia_pago_mensual, fecha_inicio];
        const resultadoContrato = await db.query(queryContrato, valores);

        // 2. Actualizar el estado de la unidad a 'ocupado'
        await db.query('UPDATE unidades SET estado = $1 WHERE id = $2', ['ocupado', unidad_id]);

        await db.query('COMMIT');

        res.status(201).json({
            mensaje: "Contrato creado y unidad marcada como ocupada",
            data: resultadoContrato.rows[0]
        });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear contrato", error: error.message });
    }
};

module.exports = { crearContrato };