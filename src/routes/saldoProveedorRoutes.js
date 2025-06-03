const express = require('express');
const router = express.Router();
const saldoController = require('../controllers/saldoProveedorController');

router.get('/', saldoController.getAll);
router.get('/:id', saldoController.getById);
router.post('/', saldoController.create);
router.put('/:id', saldoController.update);
router.delete('/:id', saldoController.delete);

module.exports = router;
