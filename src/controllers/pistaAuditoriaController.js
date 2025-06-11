// src/controllers/auditoriaController.js
const { PistaAuditoria } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const registros = await PistaAuditoria.findAll();
    res.json(registros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const reg = await PistaAuditoria.findByPk(id);
    if (!reg) {
      return res.status(404).json({ error: 'Registro de auditoría no encontrado' });
    }
    res.json(reg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevo = await PistaAuditoria.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Opcional: normalmente no se actualiza auditoría
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const reg = await PistaAuditoria.findByPk(id);
    if (!reg) {
      return res.status(404).json({ error: 'Registro de auditoría no encontrado' });
    }
    await reg.update(req.body);
    res.json(reg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const borrado = await PistaAuditoria.destroy({ where: { id } });
    if (!borrado) {
      return res.status(404).json({ error: 'Registro de auditoría no encontrado' });
    }
    res.json({ message: 'Registro de auditoría eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
