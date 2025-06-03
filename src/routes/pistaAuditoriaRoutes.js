const express = require('express');
const router = express.Router();
const PistaAuditoriaController = require('../controllers/auditoriaController');

router.get('/', PistaAuditoriaController.getAll);
router.get('/:id', PistaAuditoriaController.getById);
router.post('/', PistaAuditoriaController.create);
router.delete('/:id', PistaAuditoriaController.delete);

module.exports = router;