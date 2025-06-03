// src/models/saldosProveedorModel.js
const db = require('../config/db');

const saldosProveedorModel = {
  async getAll() {
    return db.query('SELECT * FROM saldos_proveedor');
  },

  async getById(id) {
    return db.query('SELECT * FROM saldos_proveedor WHERE id = $1', [id]);
  },

  async create(data) {
    const {
      proveedor_cedula_ruc,
      factura_id,
      monto_original,
      saldo_pendiente,
      fecha_vencimiento,
      estado,
      usuario_creacion
    } = data;

    const query = `
      INSERT INTO saldos_proveedor (
        proveedor_cedula_ruc, factura_id, monto_original,
        saldo_pendiente, fecha_vencimiento, estado, usuario_creacion
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      proveedor_cedula_ruc,
      factura_id,
      monto_original,
      saldo_pendiente,
      fecha_vencimiento,
      estado,
      usuario_creacion
    ];

    return db.query(query, values);
  },

  async update(id, data) {
    const {
      proveedor_cedula_ruc,
      factura_id,
      monto_original,
      saldo_pendiente,
      fecha_vencimiento,
      estado,
      usuario_modificacion
    } = data;

    const query = `
      UPDATE saldos_proveedor
      SET proveedor_cedula_ruc = $1,
          factura_id = $2,
          monto_original = $3,
          saldo_pendiente = $4,
          fecha_vencimiento = $5,
          estado = $6,
          fecha_modificacion = CURRENT_TIMESTAMP,
          usuario_modificacion = $7
      WHERE id = $8
      RETURNING *;
    `;

    const values = [
      proveedor_cedula_ruc,
      factura_id,
      monto_original,
      saldo_pendiente,
      fecha_vencimiento,
      estado,
      usuario_modificacion,
      id
    ];

    return db.query(query, values);
  },

  async delete(id) {
    return db.query('DELETE FROM saldos_proveedor WHERE id = $1 RETURNING *', [id]);
  }
};

module.exports = saldosProveedorModel;
