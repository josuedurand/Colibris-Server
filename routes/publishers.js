const 
    express = require('express'),
    router = express.Router(),
    publisherController = require('../controllers/publishers');

router.get('/', publisherController.getAll);
router.post('/', publisherController.create);
router.get('/:publisherId', publisherController.getById);
router.put('/:publisherId', publisherController.updateById);
router.delete('/:publisherId', publisherController.deleteById);

module.exports = router;
