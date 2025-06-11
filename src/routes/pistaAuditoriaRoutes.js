// src/routes/pistaAuditoriaRoutes.js
const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/pistaAuditoriaController');

/**
 * @swagger
 * tags:
 *   - name: PistaAuditoria
 *     description: Operaciones sobre registros de auditoría
 */

/**
 * @swagger
 * /api/auditoria:
 *   get:
 *     tags:
 *       - PistaAuditoria
 *     summary: Obtiene todos los registros de auditoría
 *     responses:
 *       200:
 *         description: Lista de registros de auditoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PistaAuditoria'
 */
router.get('/', auditoriaController.getAll);

/**
 * @swagger
 * /api/auditoria/{id}:
 *   get:
 *     tags:
 *       - PistaAuditoria
 *     summary: Obtiene un registro de auditoría por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del registro de auditoría
 *     responses:
 *       200:
 *         description: Registro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PistaAuditoria'
 *       404:
 *         description: Registro no encontrado
 */
router.get('/:id', auditoriaController.getById);

/**
 * @swagger
 * /api/auditoria:
 *   post:
 *     tags:
 *       - PistaAuditoria
 *     summary: Crea un nuevo registro de auditoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PistaAuditoriaCreate'
 *           example:
 *             usuario_id: "string"
 *             usuario_nombre: "string"
 *             rol: "string"
 *             tipo_accion: "string"
 *             tabla_afectada: "string"
 *             registro_id: 0
 *             datos_anteriores: {}         # o null
 *             datos_nuevos: {}             # o null
 *             campos_modificados:
 *               - "string"
 *     responses:
 *       201:
 *         description: Registro de auditoría creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PistaAuditoria'
 *       400:
 *         description: Error de validación o valor inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', auditoriaController.create);

/**
 * @swagger
 * /api/auditoria/{id}:
 *   delete:
 *     tags:
 *       - PistaAuditoria
 *     summary: Elimina un registro de auditoría
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del registro de auditoría
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', auditoriaController.delete);

module.exports = router;
