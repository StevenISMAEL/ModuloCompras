const db = require('../config/db');

const tokensApiModel = {
  getAll: async () => {
    return await db.query('SELECT * FROM tokens_api');
  },

  getById: async (id) => {
    return await db.query('SELECT * FROM tokens_api WHERE id = $1', [id]);
  },

  create: async (data) => {
    const { token, descripcion, activo } = data;
    return await db.query(
      'INSERT INTO tokens_api (token, descripcion, activo) VALUES ($1, $2, $3) RETURNING *',
      [token, descripcion, activo]
    );
  },

  update: async (id, data) => {
    const { token, descripcion, activo } = data;
    return await db.query(
      'UPDATE tokens_api SET token = $1, descripcion = $2, activo = $3 WHERE id = $4 RETURNING *',
      [token, descripcion, activo, id]
    );
  },

  delete: async (id) => {
    return await db.query('DELETE FROM tokens_api WHERE id = $1', [id]);
  },
};

module.exports = tokensApiModel;
