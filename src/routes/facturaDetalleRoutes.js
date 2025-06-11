// src/routes/facturaDetalleRoutes.js
const express = require('express');
const router = express.Router();
const detalleController = require('../controllers/FacturaCompraDetalleController');

/**
 * @swagger
 * tags:
 *   - name: FacturasDetalle
 *     description: Operaciones sobre detalles de facturas de compra
 */

/**
 * @swagger
 * /api/detalles-factura:
 *   get:
 *     tags:
 *       - FacturasDetalle
 *     summary: Obtiene todos los detalles de factura
 *     responses:
 *       200:
 *         description: Lista de detalles de factura
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FacturaDetalle'
 */
router.get('/', detalleController.getAll);

/**
 * @swagger
 * /api/detalles-factura/{id}:
 *   get:
 *     tags:
 *       - FacturasDetalle
 *     summary: Obtiene un detalle de factura por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del detalle de factura
 *     responses:
 *       200:
 *         description: Detalle encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacturaDetalle'
 *       404:
 *         description: Detalle no encontrado
 */
router.get('/:id', detalleController.getById);

/**
 * @swagger
 * /api/detalles-factura:
 *   post:
 *     tags:
 *       - FacturasDetalle
 *     summary: Crea un nuevo detalle de factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacturaDetalleCreate'
 *           example:
 *             factura_id: 0              # placeholder ID de factura
 *             producto_id: 0             # placeholder ID de producto
 *             cantidad: 0
 *             precio_unitario: 0
 *             aplica_iva: false          # o true
 *             subtotal: 0
 *             iva: 0
 *             total: 0
 *             usuario_creacion: "string" # placeholder ID de usuario
 *     responses:
 *       201:
 *         description: Detalle de factura creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacturaDetalle'
 *       400:
 *         description: Error de validación o valor inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', detalleController.create);

/**
 * @swagger
 * /api/detalles-factura/{id}:
 *   put:
 *     tags:
 *       - FacturasDetalle
 *     summary: Actualiza un detalle de factura existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del detalle de factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacturaDetalleUpdate'
 *           example:
 *             factura_id: 0
 *             producto_id: 0
 *             cantidad: 0
 *             precio_unitario: 0
 *             aplica_iva: true
 *             subtotal: 0
 *             iva: 0
 *             total: 0
 *             # si existe campo usuario_modificacion en tu modelo, inclúyelo:
 *             usuario_modificacion: "string"
 *     responses:
 *       200:
 *         description: Detalle de factura actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacturaDetalle'
 *       400:
 *         description: Error de validación o valor inválido
 *       404:
 *         description: Detalle no encontrado para actualizar
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', detalleController.update);

/**
 * @swagger
 * /api/detalles-factura/{id}:
 *   delete:
 *     tags:
 *       - FacturasDetalle
 *     summary: Elimina un detalle de factura
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del detalle de factura
 *     responses:
 *       200:
 *         description: Detalle eliminado correctamente
 *       404:
 *         description: Detalle no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', detalleController.delete);

module.exports = router;
