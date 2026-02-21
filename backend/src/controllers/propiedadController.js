const db = require('../config/db');

// 1. Obtener todos los edificios/casas
const getPropiedades = async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM propiedades ORDER BY id DESC');
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Crear nueva propiedad (Solo nombre y dirección)
const registrarPropiedad = async (req, res) => {
    const { nombre, direccion } = req.body; // Quitamos precio_mensual y estado
    try {
        const query = `
            INSERT INTO propiedades (nombre, direccion)
            VALUES ($1, $2) RETURNING *`;
        const values = [nombre, direccion];
        const resultado = await db.query(query, values);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Obtener una sola propiedad
const getPropiedadById = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query('SELECT * FROM propiedades WHERE id = $1', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: "Propiedad no encontrada" });
        }
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Actualizar propiedad (Corregido el mapeo de $1, $2, etc.)
const actualizarPropiedad = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion } = req.body; // Solo los campos de tu tabla
    try {
        const query = `
            UPDATE propiedades 
            SET nombre = $1, direccion = $2 
            WHERE id = $3 RETURNING *`;
        const values = [nombre, direccion, id];
        const resultado = await db.query(query, values);
        
        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: "No se encontró la propiedad" });
        }
        
        res.status(200).json({ mensaje: "Propiedad actualizada", data: resultado.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Eliminar propiedad
const eliminarPropiedad = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM propiedades WHERE id = $1', [id]);
        res.status(200).json({ mensaje: "Propiedad eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    getPropiedades, 
    registrarPropiedad, 
    eliminarPropiedad, 
    getPropiedadById, 
    actualizarPropiedad 
};