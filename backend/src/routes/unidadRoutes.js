const router = require('express').Router();
const { registrarUnidad } = require('../controllers/unidadController');
router.post('/', registrarUnidad);
module.exports = router;