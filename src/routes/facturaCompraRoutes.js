// src/routes/facturaCompraRoutes.js
const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/FacturaCompraController');

/**
 * @swagger
 * tags:
 *   - name: FacturasCompra
 *     description: Operaciones sobre facturas de compra
 */

/**
 * @swagger
 * /api/facturas:
 *   get:
 *     tags:
 *       - FacturasCompra
 *     summary: Obtiene todas las facturas de compra
 *     responses:
 *       200:
 *         description: Lista de facturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FacturaCompra'
 */
router.get('/', facturaController.getAll);

/**
 * @swagger
 * /api/facturas/{id}:
 *   get:
 *     tags:
 *       - FacturasCompra
 *     summary: Obtiene una factura por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacturaCompra'
 *       404:
 *         description: Factura no encontrada
 */
router.get('/:id', facturaController.getById);

/**
 * @swagger
 * /api/facturas:
 *   post:
 *     tags:
 *       - FacturasCompra
 *     summary: Crea una nueva factura de compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacturaCompraCreate'
 *           example:
 *             numero_factura: "string"
 *             numero_factura_proveedor: "string"
 *             fecha_emision: "2025-06-11"          # formato YYYY-MM-DD
 *             proveedor_cedula_ruc: "string"
 *             tipo_pago: "string"                  # "Crédito" o "Contado"
 *             fecha_vencimiento: "2025-06-11"      # formato YYYY-MM-DD
 *             subtotal: 0
 *             iva: 0
 *             total: 0
 *             estado: "string"                     # "Registrada","Impresa","Cancelada"
 *             impresion_realizada: false           # o true
 *             fecha_impresion: "2025-06-11T00:00:00Z"  # opcional, si impresión realizada
 *             observaciones: "string"
 *             usuario_creacion: "string"           # placeholder ID de usuario
 *     responses:
 *       201:
 *         description: Factura creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacturaCompra'
 *       400:
 *         description: Error de validación o valor inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', facturaController.create);

/**
 * @swagger
 * /api/facturas/{id}:
 *   put:
 *     tags:
 *       - FacturasCompra
 *     summary: Actualiza una factura existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacturaCompraUpdate'
 *           example:
 *             numero_factura: "string"
 *             numero_factura_proveedor: "string"
 *             fecha_emision: "2025-06-12"
 *             proveedor_cedula_ruc: "string"
 *             tipo_pago: "string"
 *             fecha_vencimiento: "2025-06-12"
 *             subtotal: 0
 *             iva: 0
 *             total: 0
 *             estado: "string"
 *             impresion_realizada: true
 *             fecha_impresion: "2025-06-12T10:00:00Z"
 *             observaciones: "string"
 *             usuario_modificacion: "string"
 *     responses:
 *       200:
 *         description: Factura actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacturaCompra'
 *       400:
 *         description: Error de validación o valor inválido
 *       404:
 *         description: Factura no encontrada para actualizar
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', facturaController.update);

/**
 * @swagger
 * /api/facturas/{id}:
 *   delete:
 *     tags:
 *       - FacturasCompra
 *     summary: Elimina una factura
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura eliminada correctamente
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', facturaController.delete);

module.exports = router;
