const express = require('express');
const router = express.Router();
// Importamos lo que acabamos de exportar
const { getPagos, crearPago, confirmarPago } = require('../controllers/pagoController');

router.get('/', getPagos); // Esta es la que estaba fallando (línea 11 probablemente)
router.post('/', crearPago);
router.put('/confirmar/:id', confirmarPago);

module.exports = router;