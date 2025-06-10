const express = require('express');
const router = express.Router();
const detalleController = require('../controllers/FacturaCompraDetalleController');

/**
 * @swagger
 * /detalles-factura:
 *   get:
 *     summary: Obtener todos los detalles de factura
 *     tags: [DetallesFactura]
 *     responses:
 *       200:
 *         description: Lista de detalles de factura
 */
router.get('/', detalleController.getAll);

/**
 * @swagger
 * /detalles-factura/{id}:
 *   get:
 *     summary: Obtener detalle por ID
 *     tags: [DetallesFactura]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Detalle encontrado
 */
router.get('/:id', detalleController.getById);

/**
 * @swagger
 * /detalles-factura:
 *   post:
 *     summary: Crear un nuevo detalle de factura
 *     tags: [DetallesFactura]
 *     responses:
 *       201:
 *         description: Detalle creado
 */
router.post('/', detalleController.create);

/**
 * @swagger
 * /detalles-factura/{id}:
 *   put:
 *     summary: Actualizar detalle por ID
 *     tags: [DetallesFactura]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Detalle actualizado
 */
router.put('/:id', detalleController.update);

/**
 * @swagger
 * /detalles-factura/{id}:
 *   delete:
 *     summary: Eliminar detalle por ID
 *     tags: [DetallesFactura]
 */
router.delete('/:id', detalleController.delete);

module.exports = router;
