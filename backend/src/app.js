const express = require('express');
require('dotenv').config();
const cors = require('cors'); 
const db = require('./config/db');

// 1. Importación de las rutas
const authRoutes = require('./routes/auth'); // <--- NUEVA RUTA DE LOGIN/REGISTRO
const inquilinoRoutes = require('./routes/inquilinoRoutes'); 
const propiedadRoutes = require('./routes/propiedadRoutes');
const cuartoRoutes = require('./routes/unidadRoutes');
const contratoRoutes = require('./routes/contratoRoutes');
const pagoRoutes = require('./routes/pagoRoutes');

const app = express();

// 2. Middlewares (El orden es vital para que funcione el Login)
app.use(cors()); // Permite que el frontend se conecte
app.use(express.json()); // Permite que el servidor entienda los datos JSON que envías

// 3. Rutas del sistema
app.use('/api/auth', authRoutes); // <--- ENDPOINT PARA LOGIN Y REGISTRO
app.use('/api/inquilinos', inquilinoRoutes); 
app.use('/api/propiedades', propiedadRoutes);
app.use('/api/unidades', cuartoRoutes);
app.use('/api/contratos', contratoRoutes);
app.use('/api/pagos', pagoRoutes);

// Endpoint de estado de cuenta (opcional si ya está en pagoRoutes)
app.get('/api/estado-cuenta/:contrato_id', (req, res) => {
    // Aquí iría la lógica o el llamado al controlador
});

app.get('/', (req, res) => {
  res.send('API de Gestión de Alquileres funcionando 🚀');
});

// 4. Encendido del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});