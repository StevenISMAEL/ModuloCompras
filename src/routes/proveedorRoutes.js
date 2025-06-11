// src/routes/proveedorRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/proveedoresController');

/**
 * @swagger
 * tags:
 *   - name: Proveedores
 *     description: Operaciones sobre proveedores
 */

/**
 * @swagger
 * /api/proveedores:
 *   get:
 *     tags:
 *       - Proveedores
 *     summary: Obtiene todos los proveedores
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Proveedor'
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/proveedores/{cedula_ruc}:
 *   get:
 *     tags:
 *       - Proveedores
 *     summary: Obtiene un proveedor por cédula o RUC
 *     parameters:
 *       - in: path
 *         name: cedula_ruc
 *         schema:
 *           type: string
 *         required: true
 *         description: Cédula o RUC del proveedor
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedor'
 *       404:
 *         description: Proveedor no encontrado
 */
router.get('/:cedula_ruc', controller.getById);

/**
 * @swagger
 * /api/proveedores:
 *   post:
 *     tags:
 *       - Proveedores
 *     summary: Crea un nuevo proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProveedorCreate'
 *           example:
 *             cedula_ruc: "string"
 *             nombre: "string"
 *             ciudad: "string"
 *             tipo_proveedor: "string"    # debe coincidir con enum en BD: "Crédito" o "Contado"
 *             direccion: "string"
 *             telefono: "string"
 *             email: "user@example.com"
 *             usuario_creacion: "string"  # placeholder; en la práctica, entero con ID de usuario
 *             estado: false               # o true; placeholder boolean
 *     responses:
 *       201:
 *         description: Proveedor creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedor'
 *       400:
 *         description: Error de validación o valor inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/proveedores/{cedula_ruc}:
 *   put:
 *     tags:
 *       - Proveedores
 *     summary: Actualiza un proveedor existente
 *     parameters:
 *       - in: path
 *         name: cedula_ruc
 *         schema:
 *           type: string
 *         required: true
 *         description: Cédula o RUC del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProveedorUpdate'
 *           example:
 *             nombre: "string"
 *             ciudad: "string"
 *             tipo_proveedor: "string"    # "Crédito" o "Contado"
 *             direccion: "string"
 *             telefono: "string"
 *             email: "user@example.com"
 *             estado: true                # o false
 *             usuario_modificacion: "string"  # placeholder: ID de usuario como string
 *     responses:
 *       200:
 *         description: Proveedor actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedor'
 *       400:
 *         description: Error de validación o valor inválido
 *       404:
 *         description: Proveedor no encontrado para actualizar
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:cedula_ruc', controller.update);

/**
 * @swagger
 * /api/proveedores/{cedula_ruc}:
 *   delete:
 *     tags:
 *       - Proveedores
 *     summary: Elimina un proveedor
 *     parameters:
 *       - in: path
 *         name: cedula_ruc
 *         schema:
 *           type: string
 *         required: true
 *         description: Cédula o RUC del proveedor
 *     responses:
 *       200:
 *         description: Proveedor eliminado correctamente
 *       400:
 *         description: No se puede eliminar debido a facturas asociadas
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:cedula_ruc', controller.delete);

module.exports = router;
