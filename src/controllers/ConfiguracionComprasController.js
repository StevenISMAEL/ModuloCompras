// src/controllers/ConfiguracionComprasController.js
const { ConfiguracionCompras } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const configs = await ConfiguracionCompras.findAll();
    res.json(configs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const cfg = await ConfiguracionCompras.findByPk(id);
    if (!cfg) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    res.json(cfg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.create = async (req, res) => {
  try {
    const { clave, valor, descripcion, usuario_modificacion } = req.body;

    if (!clave || !valor || usuario_modificacion === undefined) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const nuevaConfig = await ConfiguracionCompras.create({
      clave,
      valor,
      descripcion,
      usuario_modificacion,
      fecha_modificacion: new Date()
    });

    res.status(201).json(nuevaConfig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear configuración' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const cfg = await ConfiguracionCompras.findByPk(id);
    if (!cfg) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    await cfg.update(req.body);
    res.json(cfg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const borrado = await ConfiguracionCompras.destroy({ where: { id } });
    if (!borrado) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    res.json({ message: 'Configuración eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
