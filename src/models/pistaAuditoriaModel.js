const db = require('../config/db');

const pistaAuditoriaModel = {
  async getAll() {
    return db.query('SELECT * FROM pista_auditoria');
  },

  async getById(id) {
    return db.query('SELECT * FROM pista_auditoria WHERE id = $1', [id]);
  },

  async create(data) {
    const { usuario, accion, tabla_afectada, fecha_hora } = data;
    const query = `
      INSERT INTO pista_auditoria (usuario, accion, tabla_afectada, fecha_hora)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [usuario, accion, tabla_afectada, fecha_hora];
    return db.query(query, values);
  },

  async update(id, data) {
    const { usuario, accion, tabla_afectada, fecha_hora } = data;
    const query = `
      UPDATE pista_auditoria
      SET usuario = $1,
          accion = $2,
          tabla_afectada = $3,
          fecha_hora = $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [usuario, accion, tabla_afectada, fecha_hora, id];
    return db.query(query, values);
  },

  async delete(id) {
    return db.query('DELETE FROM pista_auditoria WHERE id = $1 RETURNING *', [id]);
  }
};

module.exports = pistaAuditoriaModel;
