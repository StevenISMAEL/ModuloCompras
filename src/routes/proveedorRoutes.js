const express = require('express');
const router = express.Router();
const controller = require('../controllers/proveedoresController');

/**
 * @swagger
 * /proveedores:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags: [Proveedores]
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /proveedores/{cedula_ruc}:
 *   get:
 *     summary: Obtener proveedor por cédula o RUC
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: cedula_ruc
 *         schema:
 *           type: string
 *         required: true
 */
router.get('/:cedula_ruc', controller.getById);

/**
 * @swagger
 * /proveedores:
 *   post:
 *     summary: Crear proveedor
 *     tags: [Proveedores]
 */
router.post('/', controller.create);

/**
 * @swagger
 * /proveedores/{cedula_ruc}:
 *   put:
 *     summary: Actualizar proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: cedula_ruc
 *         schema:
 *           type: string
 *         required: true
 */
router.put('/:cedula_ruc', controller.update);

/**
 * @swagger
 * /proveedores/{cedula_ruc}:
 *   delete:
 *     summary: Eliminar proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: cedula_ruc
 *         schema:
 *           type: string
 *         required: true
 */
router.delete('/:cedula_ruc', controller.delete);

module.exports = router;
