// models/configuracionComprasModel.js
const pool = require('../config/db');

const ConfiguracionCompras = {
  async getByClave(clave) {
    const result = await pool.query('SELECT * FROM configuracion_compras WHERE clave = $1', [clave]);
    return result.rows[0];
  },

  async update(clave, valor, descripcion, usuario_modificacion) {
    const result = await pool.query(
      `UPDATE configuracion_compras SET valor = $1, descripcion = $2, usuario_modificacion = $3,
        fecha_modificacion = NOW() WHERE clave = $4 RETURNING *`,
      [valor, descripcion, usuario_modificacion, clave]
    );
    return result.rows[0];
  }
};

module.exports = ConfiguracionCompras;
