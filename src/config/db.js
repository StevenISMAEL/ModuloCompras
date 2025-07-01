// src/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Lee las variables de entorno para conexión
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  // Opcionalmente: DB_SCHEMA, DB_DIALECT si fuese necesario
} = process.env;

// Crea la instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mssql', // <--- ¡Debe decir 'mssql'!

    // Opciones IMPORTANTES para Azure
    dialectOptions: {
      options: {
        encrypt: true, // Azure requiere conexiones encriptadas
        trustServerCertificate: false 
      }
    }
  }
);
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}
testConnection();

module.exports = sequelize;
