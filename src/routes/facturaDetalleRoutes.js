const express = require('express');
const router = express.Router();
const detalleController = require('../controllers/FacturaCompraDetalleController');

router.get('/', detalleController.getAll);
router.get('/:id', detalleController.getById);
router.post('/', detalleController.create);
router.put('/:id', detalleController.update);
router.delete('/:id', detalleController.delete);

module.exports = router;
