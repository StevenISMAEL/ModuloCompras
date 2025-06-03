const express = require('express');
const router = express.Router();
const FacturaCompraController = require('../controllers/facturaCompraController');

router.get('/', FacturaCompraController.getAll);
router.get('/:id', FacturaCompraController.getById);
router.post('/', FacturaCompraController.create);
router.put('/:id', FacturaCompraController.update);
router.delete('/:id', FacturaCompraController.delete);

module.exports = router;
