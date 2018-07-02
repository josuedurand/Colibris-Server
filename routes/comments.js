const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments');

router.get('/', commentController.getAll);
router.post('/', commentController.create);
router.get('/:commentId', commentController.getById);
router.put('/:commentId', commentController.updateById);
router.delete('/:commentId', commentController.deleteById);

module.exports = router;
