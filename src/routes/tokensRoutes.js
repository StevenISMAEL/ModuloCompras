const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokensController');

router.get('/', tokenController.getAll);
router.get('/:id', tokenController.getById);
router.post('/', tokenController.create);
router.put('/:id', tokenController.update);
router.delete('/:id', tokenController.delete);

module.exports = router;
