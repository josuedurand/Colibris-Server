const BookingModel = require('../models/bookings');

module.exports = {

	getById: function (req, res, next) {
		console.log(req.body);
		BookingModel.findById(req.params.bookingId, function (err, bookingInfo) {
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Booking found!!!", data:{booking: bookingInfo}});
			}
		});
    },
    
	getAll: function (req, res, next) {
		let bookingsList = [];
		BookingModel.find({}, function (err, bookings) {
			if (err) {
				next(err);
			} else {
				for (let booking of bookings) {
					bookingsList.push({
						id: booking._id,
                        startDate: booking.startDate,
                        endDate: booking.endDate,
                        requestDate: booking.requestDate,
                        decisionDate: booking.decisionDate,
                        status: booking.status
					});
				}
				res.json({ status: "success", message: "Liste des réservation trouvé avec succés.", data: { bookings: bookingsList } });
			}
		});
    },
    
	updateById: function (req, res, next) {
		BookingModel.findByIdAndUpdate(req.params.bookingId, { startDate: req.body.startDate, endDate: req.body.endDate, requestDate: req.body.requestDate, decisionDate: req.body.decisionDate, status: req.body.status }, function (err, bookingInfo) {
			if (err)
				next(err);
			else {
				res.json({status:"success", message: "Booking Update!!!", data:null});
			}
		});
    },
    
	deleteById: function (req, res, next) {
		BookingModel.findByIdAndRemove(req.params.bookingId, function (err, bookingInfo) {
			if (err)
				next(err);
			else {
				res.json({status:"success", message: "Booking Delete!!!", data: null});
			}
		});
    },
    
	create: function (req, res, next) {
		BookingModel.create({ startDate: req.body.startDate, endDate: req.body.endDate, requestDate: req.body.requestDate, decisionDate: req.body.decisionDate, status: req.body.status }, function (err, result) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: `Booking Create !!`, data: null });
			}
		});
	}
}
