// src/routes/saldoProveedorRoutes.js
const express = require('express');
const router = express.Router();
const saldoController = require('../controllers/saldoProveedorController');

/**
 * @swagger
 * tags:
 *   - name: SaldosProveedor
 *     description: Operaciones sobre saldos de proveedor
 */

/**
 * @swagger
 * /api/saldos:
 *   get:
 *     tags:
 *       - SaldosProveedor
 *     summary: Obtiene todos los saldos de proveedor
 *     responses:
 *       200:
 *         description: Lista de saldos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SaldoProveedor'
 */
router.get('/', saldoController.getAll);

/**
 * @swagger
 * /api/saldos/{id}:
 *   get:
 *     tags:
 *       - SaldosProveedor
 *     summary: Obtiene un saldo de proveedor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del saldo
 *     responses:
 *       200:
 *         description: Saldo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaldoProveedor'
 *       404:
 *         description: Saldo no encontrado
 */
router.get('/:id', saldoController.getById);

/**
 * @swagger
 * /api/saldos:
 *   post:
 *     tags:
 *       - SaldosProveedor
 *     summary: Crea un nuevo saldo de proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaldoProveedorCreate'
 *           example:
 *             proveedor_cedula_ruc: "string"
 *             factura_id: 0
 *             monto_original: 0
 *             saldo_pendiente: 0
 *             fecha_vencimiento: "2025-06-11"    # YYYY-MM-DD
 *             estado: "string"                  # "Pendiente","Pagado","Vencido"
 *             usuario_creacion: "string"
 *     responses:
 *       201:
 *         description: Saldo de proveedor creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaldoProveedor'
 *       400:
 *         description: Error de validación o valor inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', saldoController.create);

/**
 * @swagger
 * /api/saldos/{id}:
 *   put:
 *     tags:
 *       - SaldosProveedor
 *     summary: Actualiza un saldo de proveedor existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del saldo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaldoProveedorUpdate'
 *           example:
 *             proveedor_cedula_ruc: "string"
 *             factura_id: 0
 *             monto_original: 0
 *             saldo_pendiente: 0
 *             fecha_vencimiento: "2025-06-12"
 *             estado: "string"
 *             usuario_modificacion: "string"
 *     responses:
 *       200:
 *         description: Saldo de proveedor actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaldoProveedor'
 *       400:
 *         description: Error de validación o valor inválido
 *       404:
 *         description: Saldo no encontrado para actualizar
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', saldoController.update);

/**
 * @swagger
 * /api/saldos/{id}:
 *   delete:
 *     tags:
 *       - SaldosProveedor
 *     summary: Elimina un saldo de proveedor
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del saldo
 *     responses:
 *       200:
 *         description: Saldo eliminado correctamente
 *       404:
 *         description: Saldo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', saldoController.delete);

module.exports = router;
