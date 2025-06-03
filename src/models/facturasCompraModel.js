const db = require('../config/db');

const facturasCompraModel = {
  async getAll() {
    return db.query('SELECT * FROM facturas_compra');
  },

  async getById(id) {
    return db.query('SELECT * FROM facturas_compra WHERE id = $1', [id]);
  },

  async create(data) {
    const { id_proveedor, fecha_emision, total, estado } = data;
    const query = `
      INSERT INTO facturas_compra (id_proveedor, fecha_emision, total, estado)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [id_proveedor, fecha_emision, total, estado];
    return db.query(query, values);
  },

  async update(id, data) {
    const { id_proveedor, fecha_emision, total, estado } = data;
    const query = `
      UPDATE facturas_compra
      SET id_proveedor = $1,
          fecha_emision = $2,
          total = $3,
          estado = $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [id_proveedor, fecha_emision, total, estado, id];
    return db.query(query, values);
  },

  async delete(id) {
    return db.query('DELETE FROM facturas_compra WHERE id = $1 RETURNING *', [id]);
  }
};

module.exports = facturasCompraModel;

