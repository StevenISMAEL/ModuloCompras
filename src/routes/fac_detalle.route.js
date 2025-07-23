const express = require('express');
const router = express.Router();
const { getFacturasController } = require('../modules/fac_detalle.controller');

/**
 * @swagger
 * tags:
 *   - name: Facturas
 *     description: Operaciones sobre facturas y sus detalles
 */

/**
 * @swagger
 * /compras/facturas:
 *   get:
 *     tags:
 *       - Facturas
 *     summary: Obtiene todas las facturas con sus detalles
 *     responses:
 *       200:
 *         description: Lista de facturas con sus detalles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FacturaConDetalles'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/facturas', getFacturasController);

module.exports = router;
