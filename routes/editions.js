const
    express           = require('express'),
    router            = express.Router(),
    editionController = require('../controllers/editions');

router.get('/', editionController.getAll);
router.post('/', editionController.create);
router.get('/:editionId', editionController.getById);
router.get('/nopopulate/:editionId', editionController.getByIdNoSeriesPopulate);
router.put('/:editionId', editionController.updateById);
router.delete('/:editionId', editionController.deleteById);

module.exports = router;
