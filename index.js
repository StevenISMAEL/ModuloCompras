const express = require('express');
const serverless = require('serverless-http');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../src/docs/swaggerConfig');

const app = require('../src/app');

// (1) Asegura que la ruta esté activa desde aquí también
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = serverless(app);
