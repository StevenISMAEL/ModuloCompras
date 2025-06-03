// models/saldosProveedorModel.js
const pool = require('../config/db');

const SaldosProveedor = {
  async getByProveedor(cedula_ruc) {
    const result = await pool.query('SELECT * FROM saldos_proveedor WHERE proveedor_cedula_ruc = $1', [cedula_ruc]);
    return result.rows;
  },

  async create(data) {
    const { proveedor_cedula_ruc, factura_id, monto_original, saldo_pendiente, fecha_vencimiento, usuario_creacion } = data;
    const result = await pool.query(
      `INSERT INTO saldos_proveedor (proveedor_cedula_ruc, factura_id, monto_original, saldo_pendiente, fecha_vencimiento, usuario_creacion)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [proveedor_cedula_ruc, factura_id, monto_original, saldo_pendiente, fecha_vencimiento, usuario_creacion]
    );
    return result.rows[0];
  },

  async updateEstado(id, estado, usuario_modificacion) {
    const result = await pool.query(
      `UPDATE saldos_proveedor SET estado = $1, fecha_modificacion = NOW(), usuario_modificacion = $2 WHERE id = $3 RETURNING *`,
      [estado, usuario_modificacion, id]
    );
    return result.rows[0];
  }
};

module.exports = SaldosProveedor;
