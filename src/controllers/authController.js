// src/controllers/authController.js
const jwt = require("jsonwebtoken");

const autenticarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token recibido:", token); // Depuración
  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded); // Depuración
    req.usuario = decoded; // Agrega id_usuario, usuario, nombre_rol a req
    next();
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    res
      .status(401)
      .json({ mensaje: "Token inválido o expirado", error: error.message });
  }
};

module.exports = { autenticarToken };
