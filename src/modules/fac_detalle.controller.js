const { getAllFacturas } = require('./fac_detalle.service');

/**
 * Controlador para obtener todas las facturas con sus detalles
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getFacturasController = async (req, res) => {
  try {
    const facturas = await getAllFacturas();
    return res.status(200).json(facturas);
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getFacturasController,
};
