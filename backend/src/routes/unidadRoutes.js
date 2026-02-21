const router = require('express').Router();
const { 
  registrarUnidad, getUnidades, getUnidadById, actualizarUnidad, eliminarUnidad 
} = require('../controllers/unidadController');

router.get('/', getUnidades);
router.get('/:id', getUnidadById);
router.post('/', registrarUnidad);
router.put('/:id', actualizarUnidad);
router.delete('/:id', eliminarUnidad);

module.exports = router;