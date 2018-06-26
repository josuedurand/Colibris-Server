
const
    express         = require('express'),
    router          = express.Router(),
    movieController = require('../app/api/controllers/movies');

router.get('/', movieController.getAll);
router.post('/', movieController.create);
router.get('/:movieId', movieController.getById);
router.put('/:movieId', movieController.updateById);
router.delete('/:movieId', movieController.deleteById);

module.exports = router;