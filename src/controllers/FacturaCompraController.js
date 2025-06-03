// models/facturasCompraModel.js
const pool = require('../config/db');

const FacturasCompra = {
  async getAll() {
    const result = await pool.query('SELECT * FROM facturas_compra ORDER BY fecha_emision DESC');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM facturas_compra WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(data) {
    const { numero_factura, numero_factura_proveedor, fecha_emision, proveedor_cedula_ruc, tipo_pago, fecha_vencimiento,
            subtotal, iva, total, observaciones, usuario_creacion } = data;

    const result = await pool.query(
      `INSERT INTO facturas_compra (numero_factura, numero_factura_proveedor, fecha_emision, proveedor_cedula_ruc, tipo_pago,
        fecha_vencimiento, subtotal, iva, total, observaciones, usuario_creacion)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [numero_factura, numero_factura_proveedor, fecha_emision, proveedor_cedula_ruc, tipo_pago,
        fecha_vencimiento, subtotal, iva, total, observaciones, usuario_creacion]
    );
    return result.rows[0];
  },

  async update(id, data) {
    const { estado, fecha_modificacion, usuario_modificacion } = data;
    const result = await pool.query(
      `UPDATE facturas_compra SET estado = $1, fecha_modificacion = $2, usuario_modificacion = $3
       WHERE id = $4 RETURNING *`,
      [estado, fecha_modificacion, usuario_modificacion, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM facturas_compra WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = FacturasCompra;
