// src/controllers/tokensController.js
const { TokensApi } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const tokens = await TokensApi.findAll();
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const t = await TokensApi.findByPk(id);
    if (!t) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevo = await TokensApi.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const t = await TokensApi.findByPk(id);
    if (!t) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }
    await t.update(req.body);
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const borrado = await TokensApi.destroy({ where: { id } });
    if (!borrado) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }
    res.json({ message: 'Token eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
