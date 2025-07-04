// src/controllers/FacturaCompraController.js
const { FacturaCompra, FacturaDetalle } = require("../models");
const axios = require("axios");

// URL DE LA API DE AUDITORÍA
const AUDITORIA_URL =
  "https://aplicacion-de-seguridad-v2.onrender.com/api/auditoria";

// Función genérica para enviar auditoría
const enviarAuditoria = async ({
  accion,
  modulo = "compras",
  tabla = "facturas_compra", // ajusta si tu backend espera otro nombre
  id_usuario = null,
  details = {},
  nombre_rol = "Sistema",
}) => {
  try {
    await axios.post(AUDITORIA_URL, {
      accion,
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

// ------------------------------------------------------------------
// CRUD
// ------------------------------------------------------------------

exports.getAll = async (req, res) => {
  try {
    const facturas = await FacturaCompra.findAll();
    res.json(facturas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await FacturaCompra.findByPk(id, {
      include: [{ model: FacturaDetalle }],
    });
    if (!factura) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }
    res.json(factura);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nueva = await FacturaCompra.create(req.body);

    // AUDITORÍA: crear
    await enviarAuditoria({
      accion: "crear",
      id_usuario: req.usuario?.id || null,
      details: { antes: null, despues: nueva },
      nombre_rol: req.usuario?.rol || "Sistema",
    });

    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await FacturaCompra.findByPk(id);
    if (!factura) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }

    const datosAntes = { ...factura.get() };
    await factura.update(req.body);

    // AUDITORÍA: actualizar
    await enviarAuditoria({
      accion: "actualizar",
      id_usuario: req.usuario?.id || null,
      details: { antes: datosAntes, despues: req.body },
      nombre_rol: req.usuario?.rol || "Sistema",
    });

    res.json(factura);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Evita borrar si tiene detalles vinculados
    const detalles = await FacturaDetalle.count({ where: { factura_id: id } });
    if (detalles > 0) {
      return res.status(400).json({
        error:
          "No se puede eliminar la factura porque tiene detalles asociados.",
      });
    }

    const borrado = await FacturaCompra.destroy({ where: { id } });
    if (!borrado) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }

    // AUDITORÍA: eliminar
    await enviarAuditoria({
      accion: "eliminar",
      id_usuario: req.usuario?.id || null,
      details: { eliminado: id },
      nombre_rol: req.usuario?.rol || "Sistema",
    });

    res.json({ message: "Factura eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
