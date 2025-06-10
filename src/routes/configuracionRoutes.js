const express = require('express');
const router = express.Router();
const configuracionController = require('../controllers/ConfiguracionComprasController');

/**
 * @swagger
 * /configuracion:
 *   get:
 *     summary: Obtener todas las configuraciones
 *     tags: [Configuración]
 *     responses:
 *       200:
 *         description: Lista de configuraciones
 */
router.get('/', configuracionController.getAll);

/**
 * @swagger
 * /configuracion/{id}:
 *   put:
 *     summary: Actualizar configuración por ID
 *     tags: [Configuración]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               usuario_modificacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Configuración actualizada
 */
router.put('/:id', configuracionController.update);

module.exports = router;
