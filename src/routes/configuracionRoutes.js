const express = require('express');
const router = express.Router();
const configuracionController = require('../controllers/ConfiguracionComprasController');

router.get('/', configuracionController.getAll);
router.put('/:id', configuracionController.update);

module.exports = router;
