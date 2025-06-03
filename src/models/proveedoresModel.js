// models/proveedoresModel.js
const pool = require('../config/db');

const Proveedores = {
  async getAll() {
    const result = await pool.query('SELECT * FROM proveedores ORDER BY nombre');
    return result.rows;
  },

  async getById(cedula_ruc) {
    const result = await pool.query('SELECT * FROM proveedores WHERE cedula_ruc = $1', [cedula_ruc]);
    return result.rows[0];
  },

  async create(data) {
    const { cedula_ruc, nombre, ciudad, tipo_proveedor, direccion, telefono, email, usuario_creacion } = data;
    const result = await pool.query(
      `INSERT INTO proveedores (cedula_ruc, nombre, ciudad, tipo_proveedor, direccion, telefono, email, usuario_creacion)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [cedula_ruc, nombre, ciudad, tipo_proveedor, direccion, telefono, email, usuario_creacion]
    );
    return result.rows[0];
  },

  async update(cedula_ruc, data) {
    const { nombre, ciudad, tipo_proveedor, direccion, telefono, email, estado, usuario_modificacion } = data;
    const result = await pool.query(
      `UPDATE proveedores SET nombre = $1, ciudad = $2, tipo_proveedor = $3,
        direccion = $4, telefono = $5, email = $6, estado = $7, fecha_modificacion = NOW(), usuario_modificacion = $8
        WHERE cedula_ruc = $9 RETURNING *`,
      [nombre, ciudad, tipo_proveedor, direccion, telefono, email, estado, usuario_modificacion, cedula_ruc]
    );
    return result.rows[0];
  },

  async delete(cedula_ruc) {
    const result = await pool.query('DELETE FROM proveedores WHERE cedula_ruc = $1 RETURNING *', [cedula_ruc]);
    return result.rows[0];
  }
};

module.exports = Proveedores;
