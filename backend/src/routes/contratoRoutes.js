const express = require('express');
const router = express.Router();
const { 
    crearContrato, 
    getContratos, 
    getContratoById, // <--- Agregar esta
    actualizarContrato, 
    eliminarContrato 
} = require('../controllers/contratoController');

router.get('/', getContratos);
router.get('/:id', getContratoById); // <--- ESTA ES LA QUE FALTA
router.post('/', crearContrato);
router.put('/:id', actualizarContrato);
router.delete('/:id', eliminarContrato);

module.exports = router;