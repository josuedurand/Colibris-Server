const express = require('express');
const router = express.Router();
const editionController = require('../app/api/controllers/editions');

router.get('/', editionController.getAll);
router.post('/', editionController.create);
router.get('/:editionId', editionController.getById);
router.put('/:editionId', editionController.updateById);
router.delete('/:editionId', editionController.deleteById);

module.exports = router;