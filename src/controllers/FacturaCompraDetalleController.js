// src/controllers/FacturaCompraDetalleController.js
const { FacturaDetalle } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const detalles = await FacturaDetalle.findAll();
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
      return res.status(404).json({ error: 'Detalle no encontrado' });
    }
    res.json(detalle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevo = await FacturaDetalle.create(req.body);
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
      return res.status(404).json({ error: 'Detalle no encontrado' });
    }
    await detalle.update(req.body);
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
      return res.status(404).json({ error: 'Detalle no encontrado' });
    }
    res.json({ message: 'Detalle eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
