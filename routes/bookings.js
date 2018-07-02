const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');

router.get('/', bookingController.getAll);
router.post('/', bookingController.create);
router.get('/:bookingId', bookingController.getById);
router.put('/:bookingId', bookingController.updateById);
router.delete('/:bookingId', bookingController.deleteById);

module.exports = router;
