const express = require('express');
const router = express.Router();
const { registrarInquilino } = require('../controllers/inquilinoController');

// Ruta: POST http://localhost:3000/api/inquilinos
router.post('/', registrarInquilino);

module.exports = router;