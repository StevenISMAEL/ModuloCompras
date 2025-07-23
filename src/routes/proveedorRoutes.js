// src/routes/proveedorRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/proveedoresController");
const { autenticarToken } = require("../controllers/authController");

/**
 * @swagger
 * /api/proveedores:
 *   get:
 *     tags:
 *       - Proveedores
 *     summary: Obtiene todos los proveedores
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Proveedor'
 *       401:
 *         description: Token no proporcionado o inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", autenticarToken, controller.getAll);

/**
 * @swagger
 * /api/proveedores/{cedula_ruc}:
 *   get:
 *     tags:
 *       - Proveedores
 *     summary: Obtiene un proveedor por cedula_ruc
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Token no proporcionado o inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:cedula_ruc", autenticarToken, controller.getById);

/**
 * @swagger
 * /api/proveedores:
 *   post:
 *     tags:
 *       - Proveedores
 *     summary: Crea un nuevo proveedor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProveedorCreate'
 *     responses:
 *       201:
 *         description: Proveedor creado
 *       401:
 *         description: Token no proporcionado o inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", autenticarToken, controller.create);

/**
 * @swagger
 * /api/proveedores/{cedula_ruc}:
 *   put:
 *     tags:
 *       - Proveedores
 *     summary: Actualiza un proveedor existente
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 *       404:
 *         description: Proveedor no encontrado
 *       401:
 *         description: Token no proporcionado o inválido
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:cedula_ruc", autenticarToken, controller.update);

/**
 * @swagger
 * /api/proveedores/{cedula_ruc}:
 *   delete:
 *     tags:
 *       - Proveedores
 *     summary: Elimina un proveedor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cedula_ruc
 *         schema:
 *           type: string
 *         required: true
 *         description: Cédula o RUC del proveedor
 *     responses:
 *       200:
 *         description: Proveedor eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *       400:
 *         description: No se puede eliminar porque tiene facturas asociadas
 *       404:
 *         description: Proveedor no encontrado
 *       401:
 *         description: Token no proporcionado o inválido
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:cedula_ruc", autenticarToken, controller.delete);

module.exports = router;
