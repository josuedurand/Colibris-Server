const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collections');

router.get('/', collectionController.getAll);
router.post('/', collectionController.create);
router.get('/:collectionId', collectionController.getById);
router.put('/:collectionId', collectionController.updateById);
router.delete('/:collectionId', collectionController.deleteById);

module.exports = router;
