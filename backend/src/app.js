const express = require('express');
require('dotenv').config();
const cors = require('cors'); // Movido arriba
const db = require('./config/db');

// 1. Importación de las rutas
const inquilinoRoutes = require('./routes/inquilinoRoutes'); 
const propiedadRoutes = require('./routes/propiedadRoutes');
const cuartoRoutes = require('./routes/unidadRoutes');
const contratoRoutes = require('./routes/contratoRoutes');
const pagoRoutes = require('./routes/pagoRoutes');

const app = express();

// 2. Middlewares (El orden importa mucho)
app.use(cors()); // 1ero: Habilitar acceso desde el frontend
app.use(express.json()); // 2do: Permitir leer JSON en el body

// 3. Rutas del sistema
app.use('/api/inquilinos', inquilinoRoutes); 
app.use('/api/propiedades', propiedadRoutes);
app.use('/api/unidades', cuartoRoutes);
app.use('/api/contratos', contratoRoutes);
app.use('/api/pagos', pagoRoutes);

// Nota: El endpoint de estado-cuenta debería estar dentro de pagoRoutes.js 
// para mantener el orden, pero si quieres dejarlo aquí, se usa así:
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