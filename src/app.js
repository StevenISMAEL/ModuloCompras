const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swaggerConfig');

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/proveedores', require('./routes/proveedorRoutes'));
app.use('/api/facturas', require('./routes/facturaCompraRoutes'));
app.use('/api/detalles-factura', require('./routes/facturaDetalleRoutes'));
app.use('/api/pagos', require('./routes/pagoProveedorRoutes'));
app.use('/api/saldos', require('./routes/saldoProveedorRoutes'));
app.use('/api/auditoria', require('./routes/pistaAuditoriaRoutes'));
app.use('/api/configuracion', require('./routes/configuracionRoutes'));
app.use('/api/tokens', require('./routes/tokensRoutes'));

module.exports = app;
