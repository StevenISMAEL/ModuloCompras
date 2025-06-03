const Proveedor = require('../models/proveedoresModel');

const proveedorController = {
  getAll: async (req, res) => {
    try {
      const proveedores = await Proveedor.getAll();
      res.json(proveedores);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener proveedores' });
    }
  },

  getById: async (req, res) => {
    try {
      const proveedor = await Proveedor.getById(req.params.cedula_ruc);
      if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
      res.json(proveedor);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener proveedor' });
    }
  },

  create: async (req, res) => {
    try {
      const nuevo = await Proveedor.create(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear proveedor', detalle: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Proveedor.delete(req.params.cedula_ruc);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar proveedor' });
    }
  }
};

module.exports = proveedorController;
