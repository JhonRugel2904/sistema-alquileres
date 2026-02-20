const express = require('express');
require('dotenv').config();
const db = require('./config/db');

// 1. Importacion de las rutas del sistema
const inquilinoRoutes = require('./routes/inquilinoRoutes'); 
const propiedadRoutes = require('./routes/propiedadRoutes');
const cuartoRoutes = require('./routes/unidadRoutes');
const contratoRoutes = require('./routes/contratoRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const obtenerEstadoCuenta = require('./routes/pagoRoutes');

const app = express();

app.use(express.json()); // 2. ESTO DEBE IR PRIMERO

// 3. Las rutas van después del middleware
//ruta inquilinos
app.use('/api/inquilinos', inquilinoRoutes); 
//ruta propiedades (depas)
app.use('/api/propiedades', propiedadRoutes);
//ruta cuartos 
app.use('/api/unidades', cuartoRoutes);
// ruta contrato
app.use('/api/contratos', contratoRoutes);
// ruta pagos
app.use('/api/pagos', pagoRoutes);
router.get('/estado-cuenta/:contrato_id', obtenerEstadoCuenta);

app.get('/', (req, res) => {
  res.send('API de Gestión de Alquileres funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});