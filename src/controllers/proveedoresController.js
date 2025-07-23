const { Proveedor, FacturaCompra } = require("../models");
const axios = require("axios");

// URL de la API de auditoría
const AUDITORIA_URL =
  "https://aplicacion-de-seguridad-v2.onrender.com/api/auditoria";

// Función genérica para enviar auditoría
const enviarAuditoria = async ({
  accion,
  modulo = "compras",
  tabla = "proveedores",
  id_usuario = null, // Aquí asignas null por defecto
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
  } catch (error) {
    console.warn("Error al enviar auditoría:", error.message);
  }
};

// Función para extraer el token de los encabezados (solo para auditoría, sin autenticación)
const obtenerToken = (req) => {
  const authHeader = req.headers.authorization;
  console.log("Header authorization:", authHeader); // Depuración
  return authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : "Sin token";
};

// Listar todos los proveedores
exports.getAll = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    const token = obtenerToken(req);

    await enviarAuditoria({
      accion: "CONSULTA",
      id_usuario: null,
      details: {
        tipo: "consulta general",
        token,
        usuario_autenticado: "Sin usuario autenticado",
      },
      nombre_rol: "Sistema",
    });

    res.json(proveedores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener proveedor por ID
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
      id_usuario: null,
      details: {
        tipo: "consulta individual",
        cedula_ruc,
        token,
        usuario_autenticado: "Sin usuario autenticado",
      },
      nombre_rol: "Sistema",
    });

    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear proveedor
exports.create = async (req, res) => {
  try {
    const nuevo = await Proveedor.create(req.body);
    const token = obtenerToken(req);

    await enviarAuditoria({
      accion: "CREAR",
      id_usuario: null,
      details: {
        antes: null,
        despues: nuevo,
        token,
        usuario_autenticado: "Sin usuario autenticado",
      },
      nombre_rol: "Sistema",
    });

    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar proveedor
exports.update = async (req, res) => {
  try {
    const { cedula_ruc } = req.params;
    const proveedor = await Proveedor.findByPk(cedula_ruc);
    const token = obtenerToken(req);

    if (!proveedor) {
      return res
        .status(404)
        .json({ error: "Proveedor no encontrado para actualizar" });
    }

    const datosAntes = { ...proveedor.get() };
    await proveedor.update(req.body);

    await enviarAuditoria({
      accion: "ACTUALIZAR",
      id_usuario: null,
      details: {
        antes: datosAntes,
        despues: req.body,
        token,
        usuario_autenticado: "Sin usuario autenticado",
      },
      nombre_rol: "Sistema",
    });

    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar proveedor
exports.delete = async (req, res) => {
  try {
    const { cedula_ruc } = req.params;
    const token = obtenerToken(req);

    // Evitar borrar si posee facturas asociadas
    const facturas = await FacturaCompra.count({
      where: { proveedor_cedula_ruc: cedula_ruc },
    });
    if (facturas > 0) {
      return res.status(400).json({
        error:
          "No se puede eliminar el proveedor porque tiene facturas asociadas.",
      });
    }

    const borrado = await Proveedor.destroy({ where: { cedula_ruc } });
    if (!borrado) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }

    await enviarAuditoria({
      accion: "ELIMINAR",
      id_usuario: null,
      details: {
        eliminado: cedula_ruc,
        token,
        usuario_autenticado: "Sin usuario autenticado",
      },
      nombre_rol: "Sistema",
    });

    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
