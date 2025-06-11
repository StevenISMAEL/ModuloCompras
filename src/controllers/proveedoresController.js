// src/controllers/proveedoresController.js
const { Proveedor, FacturaCompra } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    res.json(proveedores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { cedula_ruc } = req.params;
    const proveedor = await Proveedor.findByPk(cedula_ruc);
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    // Asumimos que req.body contiene las propiedades adecuadas
    const nuevo = await Proveedor.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { cedula_ruc } = req.params;
    const proveedor = await Proveedor.findByPk(cedula_ruc);
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado para actualizar' });
    }
    // Actualiza solo campos permitidos; aquí asumimos que req.body trae solo campos editables
    await proveedor.update(req.body);
    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { cedula_ruc } = req.params;
    // Antes revisabas si existen facturas asociadas; con Sequelize podrías:
    const facturas = await FacturaCompra.count({ where: { proveedor_cedula_ruc: cedula_ruc } });
    if (facturas > 0) {
      return res.status(400).json({ error: 'No se puede eliminar el proveedor porque tiene facturas asociadas.' });
    }
    const borrado = await Proveedor.destroy({ where: { cedula_ruc } });
    if (!borrado) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
