// src/models/pistaAuditoriaModel.js
const db = require('../config/db');

const pistaAuditoriaModel = {
  async getAll() {
    return db.query('SELECT * FROM pista_auditoria');
  },

  async getById(id) {
    return db.query('SELECT * FROM pista_auditoria WHERE id = $1', [id]);
  },

  async create(data) {
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
    } = data;

    const query = `
      INSERT INTO pista_auditoria (
        usuario_id, usuario_nombre, rol,
        tipo_accion, tabla_afectada, registro_id,
        datos_anteriores, datos_nuevos, campos_modificados
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [
      usuario_id,
      usuario_nombre,
      rol,
      tipo_accion,
      tabla_afectada,
      registro_id,
      datos_anteriores,
      datos_nuevos,
      campos_modificados
    ];

    return db.query(query, values);
  },

  async update(id, data) {
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
    } = data;

    const query = `
      UPDATE pista_auditoria
      SET usuario_id = $1,
          usuario_nombre = $2,
          rol = $3,
          tipo_accion = $4,
          tabla_afectada = $5,
          registro_id = $6,
          datos_anteriores = $7,
          datos_nuevos = $8,
          campos_modificados = $9
      WHERE id = $10
      RETURNING *;
    `;

    const values = [
      usuario_id,
      usuario_nombre,
      rol,
      tipo_accion,
      tabla_afectada,
      registro_id,
      datos_anteriores,
      datos_nuevos,
      campos_modificados,
      id
    ];

    return db.query(query, values);
  },

  async delete(id) {
    return db.query('DELETE FROM pista_auditoria WHERE id = $1 RETURNING *', [id]);
  }
};

module.exports = pistaAuditoriaModel;
