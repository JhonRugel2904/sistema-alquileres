const db = require('../config/db');

const registrarPropiedad = async (req, res) => {
    const { nombre, direccion } = req.body;
    try {
        const query = 'INSERT INTO propiedades (nombre, direccion) VALUES ($1, $2) RETURNING *';
        const resultado = await db.query(query, [nombre, direccion]);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registrarPropiedad };