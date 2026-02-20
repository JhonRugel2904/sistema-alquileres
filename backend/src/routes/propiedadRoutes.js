const router = require('express').Router();
const { registrarPropiedad } = require('../controllers/propiedadController');
router.post('/', registrarPropiedad);
module.exports = router;