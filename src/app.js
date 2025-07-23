const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swaggerConfig");
const jwt = require("jsonwebtoken"); // Importar jsonwebtoken

// Crear instancia de Express
const app = express();

// --- Middleware de Autenticación ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Encabezado de autorización:", authHeader); // Depuración
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
      req.usuario = decoded; // Adjunta la información del usuario al request
      console.log("Usuario decodificado:", req.usuario); // Depuración
    } catch (err) {
      console.warn("Token inválido:", err.message);
      req.usuario = null; // Continúa sin usuario si el token es inválido
    }
  } else {
    req.usuario = null; // No hay token, continúa sin usuario
  }
  next();
};

// --- Middlewares Esenciales ---
// 1. Habilitar CORS para permitir peticiones desde tu frontend
app.use(cors());

// 2. Middleware para entender JSON en el cuerpo de las peticiones
app.use(express.json());

// 3. Middleware para ver logs de peticiones en la consola (muy útil para depurar)
app.use(morgan("dev"));

// 4. Aplicar el middleware de autenticación globalmente
app.use(authenticateToken);

// --- Ruta para la Documentación de Swagger ---
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Rutas Principales de la API ---
app.use("/api/proveedores", require("./routes/proveedorRoutes"));
app.use("/api/facturas", require("./routes/facturaCompraRoutes"));
app.use("/api/detalles-factura", require("./routes/facturaDetalleRoutes"));
app.use("/api/pagos", require("./routes/pagoProveedorRoutes"));
app.use("/api/saldos", require("./routes/saldoProveedorRoutes"));
app.use("/api/auditoria", require("./routes/pistaAuditoriaRoutes"));
app.use("/api/configuracion", require("./routes/configuracionRoutes"));
app.use("/api/tokens", require("./routes/tokensRoutes"));

// --- Ruta de Verificación (Health Check) ---
app.get("/", (req, res) => {
  res.json({ message: "API de Compras corriendo 🚀" });
});

// Exportar la app para que la use server.js
module.exports = app;
