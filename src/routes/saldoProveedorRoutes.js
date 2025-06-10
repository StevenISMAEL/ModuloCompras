const express = require('express');
const router = express.Router();
const saldoController = require('../controllers/saldoProveedorController');

/**
 * @swagger
 * /saldos:
 *   get:
 *     summary: Obtener todos los saldos de proveedor
 *     tags: [SaldosProveedor]
 */
router.get('/', saldoController.getAll);

/**
 * @swagger
 * /saldos/{id}:
 *   get:
 *     summary: Obtener saldo por ID
 *     tags: [SaldosProveedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 */
router.get('/:id', saldoController.getById);

/**
 * @swagger
 * /saldos:
 *   post:
 *     summary: Crear saldo de proveedor
 *     tags: [SaldosProveedor]
 */
router.post('/', saldoController.create);

/**
 * @swagger
 * /saldos/{id}:
 *   put:
 *     summary: Actualizar saldo
 *     tags: [SaldosProveedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 */
router.put('/:id', saldoController.update);

/**
 * @swagger
 * /saldos/{id}:
 *   delete:
 *     summary: Eliminar saldo
 *     tags: [SaldosProveedor]
 */
router.delete('/:id', saldoController.delete);

module.exports = router;
