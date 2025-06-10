const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Módulo Compras API',
      version: '1.0.0',
      description: 'Documentación de la API para la gestión de compras y proveedores',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Swagger leerá las anotaciones en tus rutas
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
