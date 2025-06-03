const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/proveedores', require('./routes/proveedorRoutes'));
app.use('/api/facturas', require('./routes/facturaCompraRoutes'));
app.use('/api/facturas-detalle', require('./routes/facturaDetalleRoutes'));
app.use('/api/saldos', require('./routes/saldoProveedorRoutes'));
app.use('/api/pagos', require('./routes/pagoProveedorRoutes'));
app.use('/api/auditoria', require('./routes/pistaAuditoriaRoutes'));
app.use('/api/configuracion', require('./routes/configuracionRoutes'));

module.exports = app;
