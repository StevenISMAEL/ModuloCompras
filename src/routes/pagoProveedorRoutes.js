const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoProveedorController');

router.get('/', pagoController.getAll);
router.get('/:id', pagoController.getById);
router.post('/', pagoController.create);
router.put('/:id', pagoController.update);
router.delete('/:id', pagoController.delete);

module.exports = router;
