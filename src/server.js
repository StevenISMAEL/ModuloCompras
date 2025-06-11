// src/server.js
const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // Si deseas sincronizar:
    // await sequelize.sync(/*{ alter: true }*/);
    await sequelize.authenticate(); // solo verificar conexión
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Documentación Swagger: http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Error al iniciar la aplicación:', err);
  }
})();
