// src/routes/pagoProveedorRoutes.js
const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoProveedorController');

/**
 * @swagger
 * tags:
 *   - name: PagosProveedor
 *     description: Operaciones sobre pagos de proveedor
 */

/**
 * @swagger
 * /api/pagos:
 *   get:
 *     tags:
 *       - PagosProveedor
 *     summary: Obtiene todos los pagos de proveedor
 *     responses:
 *       200:
 *         description: Lista de pagos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PagoProveedor'
 */
router.get('/', pagoController.getAll);

/**
 * @swagger
 * /api/pagos/{id}:
 *   get:
 *     tags:
 *       - PagosProveedor
 *     summary: Obtiene un pago por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pago
 *     responses:
 *       200:
 *         description: Pago encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PagoProveedor'
 *       404:
 *         description: Pago no encontrado
 */
router.get('/:id', pagoController.getById);

/**
 * @swagger
 * /api/pagos:
 *   post:
 *     tags:
 *       - PagosProveedor
 *     summary: Registra un nuevo pago a proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PagoProveedorCreate'
 *           example:
 *             saldo_id: 0
 *             monto: 0
 *             fecha_pago: "2025-06-11"       # YYYY-MM-DD
 *             metodo_pago: "string"
 *             referencia_pago: "string"
 *             observacion: "string"
 *             usuario_creacion: "string"
 *     responses:
 *       201:
 *         description: Pago creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PagoProveedor'
 *       400:
 *         description: Error de validación o valor inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', pagoController.create);

/**
 * @swagger
 * /api/pagos/{id}:
 *   put:
 *     tags:
 *       - PagosProveedor
 *     summary: Actualiza un pago existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PagoProveedorUpdate'
 *           example:
 *             saldo_id: 0
 *             monto: 0
 *             fecha_pago: "2025-06-12"
 *             metodo_pago: "string"
 *             referencia_pago: "string"
 *             observacion: "string"
 *             usuario_modificacion: "string"
 *     responses:
 *       200:
 *         description: Pago actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PagoProveedor'
 *       400:
 *         description: Error de validación o valor inválido
 *       404:
 *         description: Pago no encontrado para actualizar
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', pagoController.update);

/**
 * @swagger
 * /api/pagos/{id}:
 *   delete:
 *     tags:
 *       - PagosProveedor
 *     summary: Elimina un pago de proveedor
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pago
 *     responses:
 *       200:
 *         description: Pago eliminado correctamente
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', pagoController.delete);

module.exports = router;
