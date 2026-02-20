const db = require('../config/db');

// --- Función para LISTAR (La que te faltaba) ---
const getInquilinos = async (req, res) => {
    try {
        const query = 'SELECT * FROM inquilinos ORDER BY id DESC';
        const resultado = await db.query(query);
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener inquilinos", error: error.message });
    }
};

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
module.exports = { 
    registrarInquilino, 
    getInquilinos // <-- Asegúrate de que este nombre esté aquí
};