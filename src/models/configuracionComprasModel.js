const pool = require('../config/db');

const getAll = () => {
  return pool.query('SELECT * FROM configuracion_compras');
};

const getById = (id) => {
  return pool.query('SELECT * FROM configuracion_compras WHERE id = $1', [id]);
};

// No se proporciona "create" porque normalmente son configuraciones predefinidas
// Si deseas permitir crear nuevas claves, puedes incluirlo

const create = (data) => {
  const { clave, valor, descripcion, usuario_modificacion } = data;

  return pool.query(
    `
    INSERT INTO configuracion_compras (clave, valor, descripcion, usuario_modificacion)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [clave, valor, descripcion, usuario_modificacion]
  );
};

const update = (id, data) => {
  const { valor, descripcion, usuario_modificacion } = data;

  return pool.query(
    `
    UPDATE configuracion_compras
    SET valor = $1,
        descripcion = $2,
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = $3
    WHERE id = $4
    RETURNING *;
    `,
    [valor, descripcion, usuario_modificacion, id]
  );
};

const remove = (id) => {
  return pool.query('DELETE FROM configuracion_compras WHERE id = $1 RETURNING *', [id]);
};

module.exports = {
  getAll,
  getById,
  update,
  remove
};
