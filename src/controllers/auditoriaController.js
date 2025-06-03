const model = require('../models/pistaAuditoriaModel');

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
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro de auditoría no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      usuario_id,
      usuario_nombre,
      rol,
      tipo_accion,
      tabla_afectada,
      registro_id,
      datos_anteriores,
      datos_nuevos,
      campos_modificados
    } = req.body;

    const result = await model.create({
      usuario_id,
      usuario_nombre,
      rol,
      tipo_accion,
      tabla_afectada,
      registro_id,
      datos_anteriores,
      datos_nuevos,
      campos_modificados
    });

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Opcional: solo si vas a permitir modificar registros de auditoría
// (lo cual normalmente no se recomienda)
exports.update = async (req, res) => {
  try {
    const result = await model.update(req.params.id, req.body);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ⚠️ Recomendado NO usar en producción
exports.delete = async (req, res) => {
  try {
    await model.delete(req.params.id);
    res.json({ message: 'Registro de auditoría eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
