// src/app.js

const express = require('express');
const cors = require('cors'); // Asegúrate de que cors esté importado
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swaggerConfig');

// Crear instancia de Express
const app = express();

// --- Middlewares Esenciales ---
// 1. Habilitar CORS para permitir peticiones desde tu frontend
app.use(cors());

// 2. Middleware para entender JSON en el cuerpo de las peticiones
app.use(express.json());

// 3. Middleware para ver logs de peticiones en la consola (muy útil para depurar)
app.use(morgan('dev'));

// --- Ruta para la Documentación de Swagger ---
// Esta ruta SOLO se activará cuando alguien visite /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Rutas Principales de la API ---
// Express revisará estas rutas en orden.
app.use('/api/proveedores', require('./routes/proveedorRoutes'));
app.use('/api/facturas', require('./routes/facturaCompraRoutes'));
app.use('/api/detalles-factura', require('./routes/facturaDetalleRoutes'));
app.use('/api/pagos', require('./routes/pagoProveedorRoutes'));
app.use('/api/saldos', require('./routes/saldoProveedorRoutes'));
app.use('/api/auditoria', require('./routes/pistaAuditoriaRoutes'));
app.use('/api/configuracion', require('./routes/configuracionRoutes'));
app.use('/api/tokens', require('./routes/tokensRoutes'));

// --- Ruta de Verificación (Health Check) ---
// Útil para saber si la API está viva.
app.get('/', (req, res) => {
  res.json({ message: 'API de Compras corriendo 🚀' });
});

// Exportar la app para que la use server.js
module.exports = app;