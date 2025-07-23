const db = require('../config/db'); // Sequelize instance

/**
 * @typedef {Object} DetalleFactura
 * @property {number} id_detalle
 * @property {number} factura_id
 * @property {number} producto_id
 * @property {string} nombre_producto
 * @property {number} cantidad
 */

/**
 * @typedef {Object} Factura
 * @property {number} id
 * @property {string} numero_factura
 * @property {string} fecha_emision
 * @property {string} estado
 * @property {DetalleFactura[]} detalles
 */

/**
 * Obtener todas las facturas con sus detalles (SQL Server + Sequelize)
 * @returns {Promise<Factura[]>}
 */
const getAllFacturas = async () => {
  const [rows] = await db.query(`
select  fac.id, fac.numero_factura, fac.fecha_emision, fac.estado,
    det.id, det.factura_id, det.producto_id, det.nombre_producto, det.cantidad
from facturas_compra fac
join facturas_compra_detalle det
on fac.id = det.factura_id
order by fac.id;
  `);

  /** @type {Object.<number, Factura>} */
  const facturasMap = {};

  rows.forEach(row => {
    const id = row.id;
    if (!facturasMap[id]) {
      facturasMap[id] = {
        id: row.id,
        numero_factura: row.numero_factura,
        fecha_emision: row.fecha_emision,
        estado: row.estado,
        detalles: []
      };
    }

    facturasMap[id].detalles.push({
      id_detalle: row.id_detalle,
      factura_id: row.factura_id,
      producto_id: row.producto_id,
      nombre_producto: row.nombre_producto,
      cantidad: row.cantidad
    });
  });

  return Object.values(facturasMap);
};

module.exports = { getAllFacturas };
