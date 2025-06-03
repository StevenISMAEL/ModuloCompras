// src/models/facturaDetalleModel.js
const db = require('../config/db');

const facturaDetalleModel = {
  async getAll() {
    return db.query('SELECT * FROM facturas_compra_detalle');
  },

  async getById(id) {
    return db.query('SELECT * FROM facturas_compra_detalle WHERE id = $1', [id]);
  },

  async create(data) {
    const {
      factura_id,
      producto_id,
      cantidad,
      precio_unitario,
      aplica_iva,
      subtotal,
      iva,
      total,
      usuario_creacion
    } = data;

    const query = `
      INSERT INTO facturas_compra_detalle (
        factura_id, producto_id, cantidad, precio_unitario,
        aplica_iva, subtotal, iva, total, usuario_creacion
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [
      factura_id, producto_id, cantidad, precio_unitario,
      aplica_iva, subtotal, iva, total, usuario_creacion
    ];
    return db.query(query, values);
  },

  async update(id, data) {
    const {
      factura_id,
      producto_id,
      cantidad,
      precio_unitario,
      aplica_iva,
      subtotal,
      iva,
      total
    } = data;

    const query = `
      UPDATE facturas_compra_detalle
      SET factura_id = $1,
          producto_id = $2,
          cantidad = $3,
          precio_unitario = $4,
          aplica_iva = $5,
          subtotal = $6,
          iva = $7,
          total = $8
      WHERE id = $9
      RETURNING *;
    `;
    const values = [
      factura_id, producto_id, cantidad, precio_unitario,
      aplica_iva, subtotal, iva, total, id
    ];
    return db.query(query, values);
  },

  async delete(id) {
    return db.query('DELETE FROM facturas_compra_detalle WHERE id = $1 RETURNING *', [id]);
  }
};

module.exports = facturaDetalleModel;
