// src/models/facturasCompraModel.js
const db = require('../config/db');

const facturasCompraModel = {
  async getAll() {
    return db.query('SELECT * FROM facturas_compra');
  },

  async getById(id) {
    return db.query('SELECT * FROM facturas_compra WHERE id = $1', [id]);
  },

  async create(data) {
    const {
      numero_factura,
      numero_factura_proveedor,
      fecha_emision,
      proveedor_cedula_ruc,
      tipo_pago,
      fecha_vencimiento,
      subtotal,
      iva,
      total,
      estado,
      observaciones,
      usuario_creacion
    } = data;

    const query = `
      INSERT INTO facturas_compra (
        numero_factura, numero_factura_proveedor, fecha_emision,
        proveedor_cedula_ruc, tipo_pago, fecha_vencimiento,
        subtotal, iva, total, estado, observaciones, usuario_creacion
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *;
    `;
    const values = [
      numero_factura,
      numero_factura_proveedor,
      fecha_emision,
      proveedor_cedula_ruc,
      tipo_pago,
      fecha_vencimiento,
      subtotal,
      iva,
      total,
      estado,
      observaciones,
      usuario_creacion
    ];

    return db.query(query, values);
  },

  async update(id, data) {
    const {
      numero_factura,
      numero_factura_proveedor,
      fecha_emision,
      proveedor_cedula_ruc,
      tipo_pago,
      fecha_vencimiento,
      subtotal,
      iva,
      total,
      estado,
      observaciones,
      usuario_modificacion
    } = data;

    const query = `
      UPDATE facturas_compra
      SET numero_factura = $1,
          numero_factura_proveedor = $2,
          fecha_emision = $3,
          proveedor_cedula_ruc = $4,
          tipo_pago = $5,
          fecha_vencimiento = $6,
          subtotal = $7,
          iva = $8,
          total = $9,
          estado = $10,
          observaciones = $11,
          fecha_modificacion = CURRENT_TIMESTAMP,
          usuario_modificacion = $12
      WHERE id = $13
      RETURNING *;
    `;
    const values = [
      numero_factura,
      numero_factura_proveedor,
      fecha_emision,
      proveedor_cedula_ruc,
      tipo_pago,
      fecha_vencimiento,
      subtotal,
      iva,
      total,
      estado,
      observaciones,
      usuario_modificacion,
      id
    ];

    return db.query(query, values);
  },

  async delete(id) {
    return db.query('DELETE FROM facturas_compra WHERE id = $1 RETURNING *', [id]);
  }
};

module.exports = facturasCompraModel;
