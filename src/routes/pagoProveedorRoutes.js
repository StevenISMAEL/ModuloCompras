const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoProveedorController');

/**
 * @swagger
 * /pagos:
 *   get:
 *     summary: Obtener todos los pagos
 *     tags: [PagosProveedor]
 */
router.get('/', pagoController.getAll);

/**
 * @swagger
 * /pagos/{id}:
 *   get:
 *     summary: Obtener pago por ID
 *     tags: [PagosProveedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 */
router.get('/:id', pagoController.getById);

/**
 * @swagger
 * /pagos:
 *   post:
 *     summary: Registrar nuevo pago
 *     tags: [PagosProveedor]
 */
router.post('/', pagoController.create);

/**
 * @swagger
 * /pagos/{id}:
 *   put:
 *     summary: Actualizar pago
 *     tags: [PagosProveedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put('/:id', pagoController.update);

/**
 * @swagger
 * /pagos/{id}:
 *   delete:
 *     summary: Eliminar pago
 *     tags: [PagosProveedor]
 */
router.delete('/:id', pagoController.delete);

module.exports = router;
