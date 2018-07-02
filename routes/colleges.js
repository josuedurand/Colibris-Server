const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/colleges');

router.get('/', collegeController.getAll);
router.post('/', collegeController.create);
router.get('/:collegeId', collegeController.getById);
router.put('/:collegeId', collegeController.updateById);
router.delete('/:collegeId', collegeController.deleteById);

module.exports = router;
