// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swaggerConfig");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Encabezado de autorización:", authHeader);
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;
      console.log("Usuario decodificado:", req.usuario);
    } catch (err) {
      console.warn("Token inválido:", err.message);
      req.usuario = null;
    }
  } else {
    req.usuario = null;
  }
  next();
};

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(authenticateToken);

// Rutas
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/proveedores", require("./routes/proveedorRoutes"));
app.use("/api/facturas", require("./routes/facturaCompraRoutes"));
app.use("/api/detalles-factura", require("./routes/facturaDetalleRoutes"));
app.use("/api/pagos", require("./routes/pagoProveedorRoutes"));
app.use("/api/saldos", require("./routes/saldoProveedorRoutes"));
app.use("/api/auditoria", require("./routes/pistaAuditoriaRoutes"));
app.use("/api/configuracion", require("./routes/configuracionRoutes"));
app.use("/api/tokens", require("./routes/tokensRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "API de Compras corriendo 🚀" });
});

module.exports = app;
