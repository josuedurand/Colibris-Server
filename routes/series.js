
const
    express         = require('express'),
    router          = express.Router(),
    serieController = require('../controllers/series');

router.get('/', serieController.getAll);
router.post('/', serieController.create);
router.get('/:serieId', serieController.getById);
router.put('/:serieId', serieController.updateById);
router.delete('/:serieId', serieController.deleteById);

module.exports = router;
