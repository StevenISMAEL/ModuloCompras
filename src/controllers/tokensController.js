const model = require('../models/tokensApiModel');

exports.getAll = async (req, res) => {
  try {
    const result = await model.getAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
