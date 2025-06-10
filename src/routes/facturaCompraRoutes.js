const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/FacturaCompraController');

/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Obtener todas las facturas
 *     tags: [Facturas]
 */
router.get('/', facturaController.getAll);

/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     summary: Obtener factura por ID
 *     tags: [Facturas]
 */
router.get('/:id', facturaController.getById);

/**
 * @swagger
 * /facturas:
 *   post:
 *     summary: Crear una nueva factura
 *     tags: [Facturas]
 */
router.post('/', facturaController.create);

/**
 * @swagger
 * /facturas/{id}:
 *   put:
 *     summary: Actualizar una factura por ID
 *     tags: [Facturas]
 */
router.put('/:id', facturaController.update);

/**
 * @swagger
 * /facturas/{id}:
 *   delete:
 *     summary: Eliminar una factura por ID
 *     tags: [Facturas]
 */
router.delete('/:id', facturaController.delete);

module.exports = router;
