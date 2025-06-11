// src/server.js
const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // Si deseas sincronizar:
    // await sequelize.sync(/*{ alter: true }*/);
    await sequelize.authenticate(); // solo verificar conexión
    app.listen(PORT, '0.0.0.0', () => { // <-- AÑADE '0.0.0.0' AQUÍ
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Documentación Swagger: http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Error al iniciar la aplicación:', err);
  }
})();
