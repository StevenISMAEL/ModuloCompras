// src/controllers/saldoProveedorController.js
const { SaldosProveedor, PagosProveedor } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const saldos = await SaldosProveedor.findAll();
    res.json(saldos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const saldo = await SaldosProveedor.findByPk(id);
    if (!saldo) {
      return res.status(404).json({ error: 'Saldo no encontrado' });
    }
    res.json(saldo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevo = await SaldosProveedor.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const saldo = await SaldosProveedor.findByPk(id);
    if (!saldo) {
      return res.status(404).json({ error: 'Saldo no encontrado' });
    }
    await saldo.update(req.body);
    res.json(saldo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const pagos = await PagosProveedor.count({ where: { saldo_id: id } });
    if (pagos > 0) {
      return res.status(400).json({ error: 'No se puede eliminar el saldo porque tiene pagos asociados.' });
    }
    const borrado = await SaldosProveedor.destroy({ where: { id } });
    if (!borrado) {
      return res.status(404).json({ error: 'Saldo no encontrado' });
    }
    res.json({ message: 'Saldo eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
