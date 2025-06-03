// models/facturasCompraDetalleModel.js
const pool = require('../config/db');

const FacturasCompraDetalle = {
  async getByFacturaId(factura_id) {
    const result = await pool.query('SELECT * FROM facturas_compra_detalle WHERE factura_id = $1', [factura_id]);
    return result.rows;
  },

  async create(data) {
    const { factura_id, producto_id, cantidad, precio_unitario, aplica_iva, subtotal, iva, total, usuario_creacion } = data;
    const result = await pool.query(
      `INSERT INTO facturas_compra_detalle (factura_id, producto_id, cantidad, precio_unitario, aplica_iva,
        subtotal, iva, total, usuario_creacion)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [factura_id, producto_id, cantidad, precio_unitario, aplica_iva, subtotal, iva, total, usuario_creacion]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM facturas_compra_detalle WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = FacturasCompraDetalle;
