const db = require('../config/db');

const registrarUnidad = async (req, res) => {
    const { propiedad_id, nombre_nro, tipo, precio_base, paga_servicios_extra } = req.body;
    try {
        const query = `
            INSERT INTO unidades (propiedad_id, nombre_nro, tipo, precio_base, paga_servicios_extra)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [propiedad_id, nombre_nro, tipo, precio_base, paga_servicios_extra];
        const resultado = await db.query(query, values);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registrarUnidad };