// models/tokensApiModel.js
const pool = require('../config/db');

const TokensApi = {
  async create(data) {
    const { usuario_id, token, fecha_expiracion } = data;
    const result = await pool.query(
      `INSERT INTO tokens_api (usuario_id, token, fecha_expiracion) VALUES ($1,$2,$3) RETURNING *`,
      [usuario_id, token, fecha_expiracion]
    );
    return result.rows[0];
  },

  async getByToken(token) {
    const result = await pool.query('SELECT * FROM tokens_api WHERE token = $1', [token]);
    return result.rows[0];
  },

  async delete(token) {
    const result = await pool.query('DELETE FROM tokens_api WHERE token = $1 RETURNING *', [token]);
    return result.rows[0];
  }
};

module.exports = TokensApi;
