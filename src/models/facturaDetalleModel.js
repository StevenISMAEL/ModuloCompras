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
      nombre_producto, // <-- Agregado
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
        factura_id, producto_id, nombre_producto, cantidad, precio_unitario,
        aplica_iva, subtotal, iva, total, usuario_creacion
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
    const values = [
      factura_id, producto_id, nombre_producto, cantidad, precio_unitario,
      aplica_iva, subtotal, iva, total, usuario_creacion
    ];
    return db.query(query, values);
  },

  async update(id, data) {
    const {
      factura_id,
      producto_id,
      nombre_producto, // <-- Agregado
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
          nombre_producto = $3,
          cantidad = $4,
          precio_unitario = $5,
          aplica_iva = $6,
          subtotal = $7,
          iva = $8,
          total = $9
      WHERE id = $10
      RETURNING *;
    `;
    const values = [
      factura_id, producto_id, nombre_producto, cantidad, precio_unitario,
      aplica_iva, subtotal, iva, total, id
    ];
    return db.query(query, values);
  },

  async delete(id) {
    return db.query('DELETE FROM facturas_compra_detalle WHERE id = $1 RETURNING *', [id]);
  }
};

module.exports = facturaDetalleModel;
