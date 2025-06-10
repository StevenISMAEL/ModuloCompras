const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokensController');

/**
 * @swagger
 * /tokens:
 *   get:
 *     summary: Obtener todos los tokens
 *     tags: [Tokens]
 */
router.get('/', tokenController.getAll);

/**
 * @swagger
 * /tokens/{id}:
 *   get:
 *     summary: Obtener token por ID
 *     tags: [Tokens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get('/:id', tokenController.getById);

/**
 * @swagger
 * /tokens:
 *   post:
 *     summary: Crear nuevo token
 *     tags: [Tokens]
 */
router.post('/', tokenController.create);

/**
 * @swagger
 * /tokens/{id}:
 *   put:
 *     summary: Actualizar token
 *     tags: [Tokens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put('/:id', tokenController.update);

/**
 * @swagger
 * /tokens/{id}:
 *   delete:
 *     summary: Eliminar token
 *     tags: [Tokens]
 */
router.delete('/:id', tokenController.delete);

module.exports = router;
