const express = require('express');
const router = express.Router();
const { registrarPagoMensual } = require('../controllers/pagoController');

router.post('/', registrarPagoMensual);

module.exports = router;