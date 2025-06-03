// src/models/pagosProveedorModel.js
const db = require('../config/db');

const pagosProveedorModel = {
  async getAll() {
    return db.query('SELECT * FROM pagos_proveedor');
  },

  async getById(id) {
    return db.query('SELECT * FROM pagos_proveedor WHERE id = $1', [id]);
  },

  async create(data) {
    const {
      saldo_id,
      monto,
      fecha_pago,
      metodo_pago,
      referencia_pago,
      observacion,
      usuario_creacion
    } = data;

    const query = `
      INSERT INTO pagos_proveedor (
        saldo_id, monto, fecha_pago, metodo_pago,
        referencia_pago, observacion, usuario_creacion
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      saldo_id,
      monto,
      fecha_pago,
      metodo_pago,
      referencia_pago,
      observacion,
      usuario_creacion
    ];

    return db.query(query, values);
  },

  async update(id, data) {
    const {
      saldo_id,
      monto,
      fecha_pago,
      metodo_pago,
      referencia_pago,
      observacion
    } = data;

    const query = `
      UPDATE pagos_proveedor
      SET saldo_id = $1,
          monto = $2,
          fecha_pago = $3,
          metodo_pago = $4,
          referencia_pago = $5,
          observacion = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [
      saldo_id,
      monto,
      fecha_pago,
      metodo_pago,
      referencia_pago,
      observacion,
      id
    ];

    return db.query(query, values);
  },

  async delete(id) {
    return db.query('DELETE FROM pagos_proveedor WHERE id = $1 RETURNING *', [id]);
  }
};

module.exports = pagosProveedorModel;
