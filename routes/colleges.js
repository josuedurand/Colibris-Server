const
    express = require('express'),
    router = express.Router(),
    collegeController = require('../controllers/colleges');

router.get('/', collegeController.getAll);
router.post('/', collegeController.create);
router.get('/:collegeId', collegeController.getById);
router.put('/:collegeId', collegeController.updateById);
router.delete('/:collegeId', collegeController.deleteById);

module.exports = router;
