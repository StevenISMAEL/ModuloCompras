const express = require('express');
const router = express.Router();
const TokensApiController = require('../controllers/tokensController');

router.get('/', TokensApiController.getAll);
router.get('/:id', TokensApiController.getById);
router.get('/token/:token', TokensApiController.getByToken);
router.post('/', TokensApiController.create);
router.delete('/:token', TokensApiController.delete);

module.exports = router;