const jwt = require("jsonwebtoken");

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Header Authorization completo:", authHeader); // Depuración
  console.log("Todos los headers:", JSON.stringify(req.headers, null, 2)); // Depuración
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
  console.log("Token recibido:", token); // Depuración
  if (!token) {
    return res
      .status(401)
      .json({ mensaje: "Token no proporcionado o formato inválido" });
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
