// src/routes/tokensRoutes.js
const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokensController');

/**
 * @swagger
 * tags:
 *   - name: TokensApi
 *     description: Operaciones sobre tokens de API
 */

/**
 * @swagger
 * /api/tokens:
 *   get:
 *     tags:
 *       - TokensApi
 *     summary: Obtiene todos los tokens
 *     responses:
 *       200:
 *         description: Lista de tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TokensApi'
 */
router.get('/', tokenController.getAll);

/**
 * @swagger
 * /api/tokens/{id}:
 *   get:
 *     tags:
 *       - TokensApi
 *     summary: Obtiene un token por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del token
 *     responses:
 *       200:
 *         description: Token encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokensApi'
 *       404:
 *         description: Token no encontrado
 */
router.get('/:id', tokenController.getById);

/**
 * @swagger
 * /api/tokens:
 *   post:
 *     tags:
 *       - TokensApi
 *     summary: Crea un nuevo token de API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokensApiCreate'
 *           example:
 *             usuario_id: "string"
 *             token: "string"
 *             fecha_expiracion: "2025-12-31T23:59:59Z"
 *     responses:
 *       201:
 *         description: Token creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokensApi'
 *       400:
 *         description: Error de validación o valor inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', tokenController.create);

/**
 * @swagger
 * /api/tokens/{id}:
 *   put:
 *     tags:
 *       - TokensApi
 *     summary: Actualiza un token existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokensApiUpdate'
 *           example:
 *             token: "string"
 *             fecha_expiracion: "2026-01-31T23:59:59Z"
 *     responses:
 *       200:
 *         description: Token actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokensApi'
 *       400:
 *         description: Error de validación o valor inválido
 *       404:
 *         description: Token no encontrado para actualizar
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', tokenController.update);

/**
 * @swagger
 * /api/tokens/{id}:
 *   delete:
 *     tags:
 *       - TokensApi
 *     summary: Elimina un token
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del token
 *     responses:
 *       200:
 *         description: Token eliminado correctamente
 *       404:
 *         description: Token no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', tokenController.delete);

module.exports = router;
