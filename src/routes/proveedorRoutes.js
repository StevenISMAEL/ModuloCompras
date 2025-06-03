const express = require('express');
const router = express.Router();
const controller = require('../controllers/proveedoresController');

router.get('/', controller.getAll);
router.get('/:cedula_ruc', controller.getById);
router.post('/', controller.create);
router.put('/:cedula_ruc', controller.update);
router.delete('/:cedula_ruc', controller.delete);

module.exports = router;
