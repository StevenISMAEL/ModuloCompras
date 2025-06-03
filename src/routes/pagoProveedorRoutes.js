const express = require('express');
const router = express.Router();
const PagosProveedorController = require('../controllers/pagoProveedorController');

router.get('/', PagosProveedorController.getAll);
router.get('/:id', PagosProveedorController.getById);
router.get('/saldo/:saldo_id', PagosProveedorController.getBySaldoId);
router.post('/', PagosProveedorController.create);
router.put('/:id', PagosProveedorController.update);
router.delete('/:id', PagosProveedorController.delete);

module.exports = router;