const model = require('../models/saldoProveedorModel');

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
    const result = await model.getById(req.params.id);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
