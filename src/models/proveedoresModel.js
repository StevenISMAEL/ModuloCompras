const db = require('../config/db');

const proveedoresModel = {
  async getAll() {
    return db.query('SELECT * FROM proveedores');
  },

  async getById(cedula_ruc) {
    return db.query('SELECT * FROM proveedores WHERE cedula_ruc = $1', [cedula_ruc]);
  },

  async create(data) {
    const {
      cedula_ruc,
      nombre,
      ciudad,
      tipo_proveedor,
      direccion,
      telefono,
      email,
      usuario_creacion
    } = data;

    const query = `
      INSERT INTO proveedores (
        cedula_ruc, nombre, ciudad, tipo_proveedor,
        direccion, telefono, email, usuario_creacion
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      cedula_ruc,
      nombre,
      ciudad,
      tipo_proveedor,
      direccion,
      telefono,
      email,
      usuario_creacion
    ];

    return db.query(query, values);
  },

  async update(cedula_ruc, data) {
    const {
      nombre,
      ciudad,
      tipo_proveedor,
      direccion,
      telefono,
      email,
      estado,
      usuario_modificacion
    } = data;

    const query = `
      UPDATE proveedores
      SET nombre = $1,
          ciudad = $2,
          tipo_proveedor = $3,
          direccion = $4,
          telefono = $5,
          email = $6,
          estado = $7,
          fecha_modificacion = CURRENT_TIMESTAMP,
          usuario_modificacion = $8
      WHERE cedula_ruc = $9
      RETURNING *;
    `;

    const values = [
      nombre,
      ciudad,
      tipo_proveedor,
      direccion,
      telefono,
      email,
      estado,
      usuario_modificacion,
      cedula_ruc
    ];

    return db.query(query, values);
  },

  async delete(cedula_ruc) {
    return db.query('DELETE FROM proveedores WHERE cedula_ruc = $1 RETURNING *', [cedula_ruc]);
  }
};

module.exports = proveedoresModel;
