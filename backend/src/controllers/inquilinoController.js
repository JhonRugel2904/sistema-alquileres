const db = require('../config/db');

const registrarInquilino = async (req, res) => {
    const { dni, nombre, apellido, telefono, email } = req.body;

    try {
        const query = `
            INSERT INTO inquilinos (dni, nombre, apellido, telefono, email)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        
        const values = [dni, nombre, apellido, telefono, email];
        const resultado = await db.query(query, values);

        res.status(201).json({
            mensaje: "Inquilino registrado con éxito",
            data: resultado.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al registrar inquilino", error: error.message });
    }
};

module.exports = { registrarInquilino };