// src/models/tokensApiModel.js
const db = require('../config/db');

const tokensApiModel = {
  getAll: async () => {
    return await db.query('SELECT * FROM tokens_api');
  },

  getById: async (id) => {
    return await db.query('SELECT * FROM tokens_api WHERE id = $1', [id]);
  },

  create: async (data) => {
    const { usuario_id, token, fecha_expiracion } = data;

    const query = `
      INSERT INTO tokens_api (usuario_id, token, fecha_expiracion)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [usuario_id, token, fecha_expiracion];
    return await db.query(query, values);
  },

  update: async (id, data) => {
    const { token, fecha_expiracion } = data;

    const query = `
      UPDATE tokens_api
      SET token = $1,
          fecha_expiracion = $2
      WHERE id = $3
      RETURNING *;
    `;

    const values = [token, fecha_expiracion, id];
    return await db.query(query, values);
  },

  delete: async (id) => {
    return await db.query('DELETE FROM tokens_api WHERE id = $1 RETURNING *', [id]);
  },
};

module.exports = tokensApiModel;
