// src/models/facturaDetalleModel.js
const db = require('../config/db');

const facturaDetalleModel = {
  async getAll() {
    return db.query('SELECT * FROM factura_compra_detalle');
  },

  async getById(id) {
    return db.query('SELECT * FROM factura_compra_detalle WHERE id = $1', [id]);
  },

  async create(data) {
    const {
      id_factura,
      id_producto,
      cantidad,
      precio_unitario,
      descuento,
      subtotal
    } = data;

    const query = `
      INSERT INTO factura_compra_detalle (
        id_factura, id_producto, cantidad, precio_unitario, descuento, subtotal
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [id_factura, id_producto, cantidad, precio_unitario, descuento, subtotal];
    return db.query(query, values);
  },

  async update(id, data) {
    const {
      id_factura,
      id_producto,
      cantidad,
      precio_unitario,
      descuento,
      subtotal
    } = data;

    const query = `
      UPDATE factura_compra_detalle
      SET id_factura = $1,
          id_producto = $2,
          cantidad = $3,
          precio_unitario = $4,
          descuento = $5,
          subtotal = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [id_factura, id_producto, cantidad, precio_unitario, descuento, subtotal, id];
    return db.query(query, values);
  },

  async delete(id) {
    return db.query('DELETE FROM factura_compra_detalle WHERE id = $1 RETURNING *', [id]);
  }
};

module.exports = facturaDetalleModel;
