const { FacturaCompra, FacturaDetalle } = require("../models");
const axios = require("axios");

const AUDITORIA_URL =
  "https://aplicacion-de-seguridad-v2.onrender.com/api/auditoria";

const enviarAuditoria = async ({
  accion,
  modulo = "compras",
  tabla = "facturas_compra",
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
    const facturas = await FacturaCompra.findAll();

    await enviarAuditoria({
      accion: "CONSULTA",
      id_usuario: req.usuario?.id || null,
      details: { tipo: "listar todas las facturas" },
      nombre_rol: req.usuario?.rol || "Sistema",
    });

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

    await enviarAuditoria({
      accion: "CONSULTA",
      id_usuario: req.usuario?.id || null,
      details: { tipo: "consulta individual", id },
      nombre_rol: req.usuario?.rol || "Sistema",
    });

    res.json(factura);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nueva = await FacturaCompra.create(req.body);

    await enviarAuditoria({
      accion: "CREAR",
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

    await enviarAuditoria({
      accion: "ACTUALIZAR",
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

    await enviarAuditoria({
      accion: "ELIMINAR",
      id_usuario: req.usuario?.id || null,
      details: { eliminado: id },
      nombre_rol: req.usuario?.rol || "Sistema",
    });

    res.json({ message: "Factura eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
