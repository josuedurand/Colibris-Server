const PublisherModel = require('../models/publishers');

module.exports = {

	getById: function (req, res, next) {
		console.log(req.body);
		PublisherModel.findById(req.params.publisherId, function (err, publisherInfo) {
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Publisher found!!!", data:{publisher: publisherInfo}});
			}
		});
    },
    
	getAll: function (req, res, next) {
		let publishersList = [];
		PublisherModel.find({}, function (err, publishers) {
			if (err) {
				next(err);
			} else {
				for (let publisher of publishers) {
					publishersList.push({
						id: publisher._id,
						name: publisher.name
					});
				}
				res.json({ status: "success", message: "Liste des publishers trouvé avec succés.", data: { publishers: publishersList } });
			}
		});
    },
    
	updateById: function (req, res, next) {
		PublisherModel.findByIdAndUpdate(req.params.publisherId, { name: req.body.name }, function (err, publisherInfo) {
			if (err)
				next(err);
			else {
				res.json({status:"success", message: "Publisher Update!!!", data:null});
			}
		});
    },
    
	deleteById: function (req, res, next) {
		PublisherModel.findByIdAndRemove(req.params.publisherId, function (err, publisherInfo) {
			if (err)
				next(err);
			else {
				res.json({status:"success", message: "Publisher Delete!!!", data: null});
			}
		});
    },
    
	create: function (req, res, next) {
		PublisherModel.create({ name: req.body.name }, function (err, result) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: `Publisher Create !!`, data: null });
			}
		});
	}
}