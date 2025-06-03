const db = require('../config/db');

const pagosProveedorModel = {
  async getAll() {
    return db.query('SELECT * FROM pagos_proveedor');
  },

  async getById(id) {
    return db.query('SELECT * FROM pagos_proveedor WHERE id = $1', [id]);
  },

  async create(data) {
    const { id_proveedor, fecha_pago, monto, metodo_pago } = data;
    const query = `
      INSERT INTO pagos_proveedor (id_proveedor, fecha_pago, monto, metodo_pago)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [id_proveedor, fecha_pago, monto, metodo_pago];
    return db.query(query, values);
  },

  async update(id, data) {
    const { id_proveedor, fecha_pago, monto, metodo_pago } = data;
    const query = `
      UPDATE pagos_proveedor
      SET id_proveedor = $1,
          fecha_pago = $2,
          monto = $3,
          metodo_pago = $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [id_proveedor, fecha_pago, monto, metodo_pago, id];
    return db.query(query, values);
  },

  async delete(id) {
    return db.query('DELETE FROM pagos_proveedor WHERE id = $1 RETURNING *', [id]);
  }
};

module.exports = pagosProveedorModel;
