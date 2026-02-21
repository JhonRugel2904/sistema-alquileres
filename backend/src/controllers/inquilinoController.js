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

// --- Función para ELIMINAR ---
const eliminarInquilino = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM inquilinos WHERE id = $1', [id]);
        res.status(200).json({ mensaje: "Inquilino eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
};

// Obtener un solo inquilino para editar
const getInquilinoById = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query('SELECT * FROM inquilinos WHERE id = $1', [id]);
        if (resultado.rows.length === 0) return res.status(404).json({ mensaje: "No encontrado" });
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Guardar los cambios (UPDATE)
const actualizarInquilino = async (req, res) => {
    const { id } = req.params;
    const { dni, nombre, apellido, telefono, email } = req.body;
    try {
        const query = `
            UPDATE inquilinos 
            SET dni=$1, nombre=$2, apellido=$3, telefono=$4, email=$5 
            WHERE id=$6 RETURNING *`;
        const values = [dni, nombre, apellido, telefono, email, id];
        const resultado = await db.query(query, values);
        res.status(200).json({ mensaje: "Actualizado", data: resultado.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// RECUERDA: Agrégalos al module.exports al final del archivo
module.exports = { registrarInquilino, getInquilinos, eliminarInquilino, getInquilinoById, actualizarInquilino };

