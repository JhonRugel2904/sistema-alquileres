const express = require('express');
const router = express.Router();
const { crearContrato } = require('../controllers/contratoController');

router.post('/', crearContrato);

module.exports = router; // <--- ESTO ES VITAL