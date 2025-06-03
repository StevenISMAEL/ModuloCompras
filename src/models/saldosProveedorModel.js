const db = require('../config/db');

const saldosProveedorModel = {
  getAll: async () => {
    return await db.query('SELECT * FROM saldos_proveedor');
  },

  getById: async (id) => {
    return await db.query('SELECT * FROM saldos_proveedor WHERE id = $1', [id]);
  },

  create: async (data) => {
    const { proveedor_id, saldo } = data;
    return await db.query(
      'INSERT INTO saldos_proveedor (proveedor_id, saldo) VALUES ($1, $2) RETURNING *',
      [proveedor_id, saldo]
    );
  },

  update: async (id, data) => {
    const { proveedor_id, saldo } = data;
    return await db.query(
      'UPDATE saldos_proveedor SET proveedor_id = $1, saldo = $2 WHERE id = $3 RETURNING *',
      [proveedor_id, saldo, id]
    );
  },

  delete: async (id) => {
    return await db.query('DELETE FROM saldos_proveedor WHERE id = $1', [id]);
  },
};

module.exports = saldosProveedorModel;
