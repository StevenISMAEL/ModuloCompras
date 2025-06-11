// src/controllers/pagoProveedorController.js
const { PagosProveedor } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const pagos = await PagosProveedor.findAll();
    res.json(pagos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await PagosProveedor.findByPk(id);
    if (!pago) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }
    res.json(pago);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevo = await PagosProveedor.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await PagosProveedor.findByPk(id);
    if (!pago) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }
    await pago.update(req.body);
    res.json(pago);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const borrado = await PagosProveedor.destroy({ where: { id } });
    if (!borrado) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }
    res.json({ message: 'Pago eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
