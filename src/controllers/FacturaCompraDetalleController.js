const { FacturaDetalle } = require("../models");
const axios = require("axios");

const AUDITORIA_URL =
  "https://aplicacion-de-seguridad-v2.onrender.com/api/auditoria";

const enviarAuditoria = async ({
  accion,
  modulo = "compras",
  tabla = "facturas_detalle",
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
  } catch (error) {
    console.warn("Error al enviar auditoría:", error.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const detalles = await FacturaDetalle.findAll();

    await enviarAuditoria({
      accion: "CONSULTA",
      id_usuario: req.usuario?.id || null,
      details: { tipo: "listar todos los detalles" },
      nombre_rol: req.usuario?.rol || "Sistema",
    });

    res.json(detalles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const detalle = await FacturaDetalle.findByPk(id);
    if (!detalle) {
      return res.status(404).json({ error: "Detalle no encontrado" });
    }

    await enviarAuditoria({
      accion: "CONSULTA",
      id_usuario: req.usuario?.id || null,
      details: { tipo: "consulta individual", id },
      nombre_rol: req.usuario?.rol || "Sistema",
    });

    res.json(detalle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevo = await FacturaDetalle.create(req.body);

    await enviarAuditoria({
      accion: "CREAR",
      id_usuario: req.usuario?.id || null,
      details: { antes: null, despues: nuevo },
      nombre_rol: req.usuario?.rol || "Sistema",
    });

    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const detalle = await FacturaDetalle.findByPk(id);
    if (!detalle) {
      return res.status(404).json({ error: "Detalle no encontrado" });
    }

    const datosAntes = { ...detalle.get() };
    await detalle.update(req.body);

    await enviarAuditoria({
      accion: "ACTUALIZAR",
      id_usuario: req.usuario?.id || null,
      details: { antes: datosAntes, despues: req.body },
      nombre_rol: req.usuario?.rol || "Sistema",
    });

    res.json(detalle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const borrado = await FacturaDetalle.destroy({ where: { id } });
    if (!borrado) {
      return res.status(404).json({ error: "Detalle no encontrado" });
    }

    await enviarAuditoria({
      accion: "ELIMINAR",
      id_usuario: req.usuario?.id || null,
      details: { eliminado: id },
      nombre_rol: req.usuario?.rol || "Sistema",
    });

    res.json({ message: "Detalle eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
