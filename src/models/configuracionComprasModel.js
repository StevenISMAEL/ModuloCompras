const pool = require('../config/db');

const getAll = () => {
  return pool.query('SELECT * FROM configuracion_compras');
};

const getById = (id) => {
  return pool.query('SELECT * FROM configuracion_compras WHERE id = $1', [id]);
};

const create = (data) => {
  const { campo1, campo2 } = data;
  return pool.query(
    'INSERT INTO configuracion_compras (campo1, campo2) VALUES ($1, $2) RETURNING *',
    [campo1, campo2]
  );
};

const update = (id, data) => {
  const { campo1, campo2 } = data;
  return pool.query(
    'UPDATE configuracion_compras SET campo1 = $1, campo2 = $2 WHERE id = $3 RETURNING *',
    [campo1, campo2, id]
  );
};

const remove = (id) => {
  return pool.query('DELETE FROM configuracion_compras WHERE id = $1 RETURNING *', [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
