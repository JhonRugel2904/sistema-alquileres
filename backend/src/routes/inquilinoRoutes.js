const express = require('express');
const router = express.Router();
// Fíjate en las llaves { }, son obligatorias para importar funciones específicas
const { registrarInquilino, getInquilinos, eliminarInquilino, actualizarInquilino, getInquilinoById } = require('../controllers/inquilinoController');

// Ahora sí podrás usarlas sin error
router.get('/', getInquilinos); 
router.post('/', registrarInquilino);
router.delete('/:id', eliminarInquilino); // DELETE http://localhost:3000/api/inquilinos/1
router.put('/:id', actualizarInquilino); // PUT http://localhost:3000/api/inquilinos/1
router.get('/:id', getInquilinoById); // Para jalar los datos al cargar el form
router.put('/:id', actualizarInquilino); // Para guardar los cambios
module.exports = router;