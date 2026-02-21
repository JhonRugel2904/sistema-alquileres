const express = require('express');
const router = express.Router();
const { 
    getPropiedades, 
    registrarPropiedad, 
    eliminarPropiedad,
    getPropiedadById,   // <--- Añade esto
    actualizarPropiedad // <--- Añade esto
} = require('../controllers/propiedadController');

router.get('/', getPropiedades);
router.post('/', registrarPropiedad);
router.delete('/:id', eliminarPropiedad);

// --- NUEVAS RUTAS PARA EL CRUD COMPLETO ---
router.get('/:id', getPropiedadById); 
router.put('/:id', actualizarPropiedad);

module.exports = router;