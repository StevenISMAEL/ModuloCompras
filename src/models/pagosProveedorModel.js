// models/pagosProveedorModel.js
const pool = require('../config/db');

const PagosProveedor = {
  async getBySaldoId(saldo_id) {
    const result = await pool.query('SELECT * FROM pagos_proveedor WHERE saldo_id = $1', [saldo_id]);
    return result.rows;
  },

  async create(data) {
    const { saldo_id, monto, fecha_pago, metodo_pago, referencia_pago, observacion, usuario_creacion } = data;
    const result = await pool.query(
      `INSERT INTO pagos_proveedor (saldo_id, monto, fecha_pago, metodo_pago, referencia_pago, observacion, usuario_creacion)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [saldo_id, monto, fecha_pago, metodo_pago, referencia_pago, observacion, usuario_creacion]
    );
    return result.rows[0];
  }
};

module.exports = PagosProveedor;
