const express = require('express');
const router = express.Router();
const { login, registro } = require('../controllers/authController'); // Ajusta la ruta a tu controlador

router.post('/registro', registro);
router.post('/login', login);

module.exports = router;