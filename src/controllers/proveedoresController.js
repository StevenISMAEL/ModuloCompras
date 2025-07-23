// src/controllers/proveedoresController.js
const { Proveedor, FacturaCompra } = require("../models");
const axios = require("axios");

const AUDITORIA_URL =
  "https://aplicacion-de-seguridad-v2.onrender.com/api/auditoria";

const obtenerToken = (req) => {
  const authHeader = req.headers.authorization;
  console.log("Header authorization:", authHeader);
  return authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : "Sin token";
};

const enviarAuditoria = async ({
  accion,
  modulo = "compras",
  tabla = "proveedores",
  id_usuario = null,
  details = {},
  nombre_rol = "Sistema",
}) => {
  try {
    await axios.post(AUDITORIA_URL, {
      accion: accion.toUpperCase(),
      modulo,
      tabla,
      id_usuario,
      details,
      nombre_rol,
    });
    console.log("Auditoría enviada:", {
      accion,
      id_usuario,
      details,
      nombre_rol,
    });
  } catch (error) {
    console.warn("Error al enviar auditoría:", error.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    const token = obtenerToken(req);

    await enviarAuditoria({
      accion: "CONSULTA",
      id_usuario: req.usuario?.id_usuario || null,
      details: {
        tipo: "consulta general",
        token,
        usuario_autenticado: req.usuario?.usuario || "Sin usuario autenticado",
      },
      nombre_rol: req.usuario?.nombre_rol || "Sistema",
    });

    res.json(proveedores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { cedula_ruc } = req.params;
    const proveedor = await Proveedor.findByPk(cedula_ruc);
    const token = obtenerToken(req);

    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }

    await enviarAuditoria({
      accion: "CONSULTA",
      id_usuario: req.usuario?.id_usuario || null,
      details: {
        tipo: "consulta individual",
        cedula_ruc,
        token,
        usuario_autenticado: req.usuario?.usuario || "Sin usuario autenticado",
      },
      nombre_rol: req.usuario?.nombre_rol || "Sistema",
    });

    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ error: "Autenticación requerida" });
    }
    const nuevo = await Proveedor.create(req.body);
    const token = obtenerToken(req);

    await enviarAuditoria({
      accion: "CREAR",
      id_usuario: req.usuario.id_usuario,
      details: {
        antes: null,
        despues: nuevo,
        token,
        usuario_autenticado: req.usuario.usuario,
      },
      nombre_rol: req.usuario.nombre_rol,
    });

    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Similar para update y delete, con validación de req.usuario
