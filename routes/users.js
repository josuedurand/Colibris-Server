
const
    express        = require('express'),
    router         = express.Router(),
    userController = require('../app/api/controllers/users');

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

module.exports = router;