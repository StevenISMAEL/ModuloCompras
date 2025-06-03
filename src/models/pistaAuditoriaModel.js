// models/pistaAuditoriaModel.js
const pool = require('../config/db');

const PistaAuditoria = {
  async log(data) {
    const { usuario_id, usuario_nombre, rol, tipo_accion, tabla_afectada, registro_id, datos_anteriores, datos_nuevos, campos_modificados } = data;
    await pool.query(
      `INSERT INTO pista_auditoria (usuario_id, usuario_nombre, rol, tipo_accion, tabla_afectada,
        registro_id, datos_anteriores, datos_nuevos, campos_modificados)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [usuario_id, usuario_nombre, rol, tipo_accion, tabla_afectada,
       registro_id, datos_anteriores, datos_nuevos, campos_modificados]
    );
  }
};

module.exports = PistaAuditoria;
