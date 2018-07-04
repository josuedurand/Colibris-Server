
const
    express        = require('express'),
    router         = express.Router(),
    userController = require('../controllers/users');

router.get('/', userController.getAll);
router.post('/', userController.create);
router.get('/:userId', userController.getById);
router.put('/:userId', userController.updateById);
router.delete('/:userId', userController.deleteById);
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

module.exports = router;
