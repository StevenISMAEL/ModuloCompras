const express = require('express');
const router = express.Router();
const ConfiguracionComprasController = require('../controllers/ConfiguracionComprasController');

router.get('/', ConfiguracionComprasController.getAll);
router.get('/:clave', ConfiguracionComprasController.getByClave);
router.post('/', ConfiguracionComprasController.create);
router.put('/:clave', ConfiguracionComprasController.update);
router.delete('/:clave', ConfiguracionComprasController.delete);

module.exports = router;