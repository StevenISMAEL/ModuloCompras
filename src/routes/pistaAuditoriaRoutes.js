const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoriaController');

/**
 * @swagger
 * /auditoria:
 *   get:
 *     summary: Obtener registros de auditoría
 *     tags: [Auditoría]
 */
router.get('/', auditoriaController.getAll);

/**
 * @swagger
 * /auditoria:
 *   post:
 *     summary: Registrar acción en la auditoría
 *     tags: [Auditoría]
 */
router.post('/', auditoriaController.create);

module.exports = router;
