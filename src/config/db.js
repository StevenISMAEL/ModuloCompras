const { Sequelize } = require("sequelize");
require("dotenv").config();

// Lee las variables de entorno para conexión
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Crea la instancia de Sequelize para MySQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 3306,
  dialect: "mysql", // Cambiado a 'mysql'
  dialectModule: require("mysql2"), // Importante para MySQL
  logging: false, // Opcional, evita logs excesivos
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida con éxito.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}
testConnection();

module.exports = sequelize;
