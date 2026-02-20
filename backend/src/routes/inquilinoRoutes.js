const express = require('express');
const router = express.Router();
// Fíjate en las llaves { }, son obligatorias para importar funciones específicas
const { registrarInquilino, getInquilinos } = require('../controllers/inquilinoController');

// Ahora sí podrás usarlas sin error
router.get('/', getInquilinos); 
router.post('/', registrarInquilino);

module.exports = router;