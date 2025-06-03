const express = require('express');
const router = express.Router();
const ProveedoresController = require('../controllers/proveedoresController');

router.get('/', ProveedoresController.getAll);
router.get('/:cedula_ruc', ProveedoresController.getById);
router.post('/', ProveedoresController.create);
router.put('/:cedula_ruc', ProveedoresController.update);
router.delete('/:cedula_ruc', ProveedoresController.delete);

module.exports = router;
