const db = require('../config/db');

// Listar todas las unidades con el nombre de su edificio
const getUnidades = async (req, res) => {
    try {
        const query = `
            SELECT u.*, p.nombre as edificio_nombre 
            FROM unidades u
            JOIN propiedades p ON u.propiedad_id = p.id
            ORDER BY u.id DESC`;
        const resultado = await db.query(query);
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Registrar nueva unidad
const registrarUnidad = async (req, res) => {
    const { propiedad_id, nombre_nro, tipo, precio_base, paga_servicios_extra, estado } = req.body;
    try {
        const query = `
            INSERT INTO unidades (propiedad_id, nombre_nro, tipo, precio_base, paga_servicios_extra, estado)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [propiedad_id, nombre_nro, tipo, precio_base, paga_servicios_extra, estado || 'disponible'];
        const resultado = await db.query(query, values);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una unidad específica por ID
const getUnidadById = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query('SELECT * FROM unidades WHERE id = $1', [id]);
        if (resultado.rows.length === 0) return res.status(404).json({ mensaje: "No encontrado" });
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar Unidad
const actualizarUnidad = async (req, res) => {
    const { id } = req.params;
    const { propiedad_id, nombre_nro, tipo, precio_base, paga_servicios_extra, estado } = req.body;
    try {
        const query = `
            UPDATE unidades 
            SET propiedad_id=$1, nombre_nro=$2, tipo=$3, precio_base=$4, paga_servicios_extra=$5, estado=$6 
            WHERE id=$7 RETURNING *`;
        const values = [propiedad_id, nombre_nro, tipo, precio_base, paga_servicios_extra, estado, id];
        const resultado = await db.query(query, values);
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar Unidad
const eliminarUnidad = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM unidades WHERE id = $1', [id]);
        res.status(200).json({ mensaje: "Unidad eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// No olvides actualizar el exports
module.exports = { getUnidades, registrarUnidad, getUnidadById, actualizarUnidad, eliminarUnidad };