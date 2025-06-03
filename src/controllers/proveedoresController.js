const model = require('../models/proveedoresModel');

exports.getAll = async (req, res) => {
  try {
    const result = await model.getAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { cedula_ruc } = req.params;
    const result = await model.getById(cedula_ruc);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const result = await model.create(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { cedula_ruc } = req.params;
    const result = await model.update(cedula_ruc, req.body);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado para actualizar' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await model.delete(req.params.cedula_ruc);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado o con facturas asociadas' });
    }
    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (err) {
    if (err.code === '23503') {
      // Código de error de llave foránea
      return res.status(400).json({
        error: 'No se puede eliminar el proveedor porque tiene facturas asociadas.'
      });
    }
    res.status(500).json({ error: err.message });
  }
};
