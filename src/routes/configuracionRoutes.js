// src/routes/configuracionRoutes.js
const express = require('express');
const router = express.Router();
const configuracionController = require('../controllers/ConfiguracionComprasController');

/**
 * @swagger
 * tags:
 *   - name: ConfiguracionCompras
 *     description: Operaciones sobre configuraciones de compras
 */

/**
 * @swagger
 * /api/configuracion:
 *   get:
 *     tags:
 *       - ConfiguracionCompras
 *     summary: Obtiene todas las configuraciones
 *     responses:
 *       200:
 *         description: Lista de configuraciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ConfiguracionCompra'
 */
router.get('/', configuracionController.getAll);

/**
 * @swagger
 * /api/configuracion/{id}:
 *   get:
 *     tags:
 *       - ConfiguracionCompras
 *     summary: Obtiene una configuración por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la configuración
 *     responses:
 *       200:
 *         description: Configuración encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConfiguracionCompra'
 *       404:
 *         description: Configuración no encontrada
 */
router.get('/:id', configuracionController.getById);

/**
 * @swagger
 * /api/configuracion:
 *   post:
 *     tags:
 *       - ConfiguracionCompras
 *     summary: Crea una nueva configuración de compras
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfiguracionCompraCreate'
 *           example:
 *             clave: "string"
 *             valor: "string"
 *             descripcion: "string"
 *             usuario_modificacion: "string"
 *     responses:
 *       201:
 *         description: Configuración creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConfiguracionCompra'
 *       400:
 *         description: Error de validación o valor inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', configuracionController.create);

/**
 * @swagger
 * /api/configuracion/{id}:
 *   put:
 *     tags:
 *       - ConfiguracionCompras
 *     summary: Actualiza una configuración existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la configuración
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfiguracionCompraUpdate'
 *           example:
 *             valor: "string"
 *             descripcion: "string"
 *             usuario_modificacion: "string"
 *     responses:
 *       200:
 *         description: Configuración actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConfiguracionCompra'
 *       400:
 *         description: Error de validación o valor inválido
 *       404:
 *         description: Configuración no encontrada para actualizar
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', configuracionController.update);

/**
 * @swagger
 * /api/configuracion/{id}:
 *   delete:
 *     tags:
 *       - ConfiguracionCompras
 *     summary: Elimina una configuración
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la configuración
 *     responses:
 *       200:
 *         description: Configuración eliminada correctamente
 *       404:
 *         description: Configuración no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', configuracionController.delete);

module.exports = router;
