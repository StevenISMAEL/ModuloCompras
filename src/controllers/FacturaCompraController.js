// src/controllers/FacturaCompraController.js
const { FacturaCompra, FacturaDetalle } = require('../models');

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
      include: [ { model: FacturaDetalle } ] // opcional: incluir detalles
    });
    if (!factura) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    res.json(factura);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nueva = await FacturaCompra.create(req.body);
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
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    await factura.update(req.body);
    res.json(factura);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    // Podrías verificar detalles asociados, si procede:
    const detalles = await FacturaDetalle.count({ where: { factura_id: id } });
    if (detalles > 0) {
      return res.status(400).json({ error: 'No se puede eliminar la factura porque tiene detalles asociados.' });
    }
    const borrado = await FacturaCompra.destroy({ where: { id } });
    if (!borrado) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    res.json({ message: 'Factura eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
