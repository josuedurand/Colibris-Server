const
    express = require('express'),
    router = express.Router(),
    bookingController = require('../controllers/bookings');

router.get('/', bookingController.getAll);
router.post('/', bookingController.create);
router.get('/:bookingId', bookingController.getById);
router.put('/:bookingId', bookingController.updateById);
router.delete('/:bookingId', bookingController.deleteById);

module.exports = router;
