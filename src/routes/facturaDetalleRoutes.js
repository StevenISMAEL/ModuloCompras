const express = require('express');
const router = express.Router();
const FacturaCompraDetalleController = require('../controllers/facturaCompraDetalleController');

router.get('/:factura_id', FacturaCompraDetalleController.getByFacturaId);
router.get('/detalle/:id', FacturaCompraDetalleController.getById);
router.post('/', FacturaCompraDetalleController.create);
router.put('/:id', FacturaCompraDetalleController.update);
router.delete('/:id', FacturaCompraDetalleController.delete);

module.exports = router;