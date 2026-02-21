const router = require('express').Router();
const { registrarPropiedad } = require('../controllers/propiedadController');
const { getPropiedades } = require('../controllers/propiedadController');
router.get('/', getPropiedades);
router.post('/', registrarPropiedad);
module.exports = router;