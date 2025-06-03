const express = require('express');
const router = express.Router();
const SaldosProveedorController = require('../controllers/saldoProveedorController');

router.get('/', SaldosProveedorController.getAll);
router.get('/:id', SaldosProveedorController.getById);
router.get('/proveedor/:cedula_ruc', SaldosProveedorController.getByProveedor);
router.post('/', SaldosProveedorController.create);
router.put('/:id', SaldosProveedorController.update);
router.delete('/:id', SaldosProveedorController.delete);

module.exports = router;
