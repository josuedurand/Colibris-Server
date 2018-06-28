const CollectionModel = require('../models/collections');

module.exports = {

	getById: function (req, res, next) {
		console.log(req.body);
		CollectionModel.findById(req.params.collectionId, function (err, collectionInfo) {
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Collection found!!!", data:{collection: collectionInfo}});
			}
		});
    },
    
	getAll: function (req, res, next) {
		let collectionsList = [];
		CollectionModel.find({}, function (err, collections) {
			if (err) {
				next(err);
			} else {
				for (let collection of collections) {
					collectionsList.push({
						id: collection._id,
						name: collection.name
					});
				}
				res.json({ status: "success", message: "Liste des collections trouvé avec succés.", data: { collections: collectionsList } });
			}
		});
    },
    
	updateById: function (req, res, next) {
		CollectionModel.findByIdAndUpdate(req.params.collectionId, { name: req.body.name }, function (err, collectionInfo) {
			if (err)
				next(err);
			else {
				res.json({status:"success", message: "Collection Update!!!", data:null});
			}
		});
    },
    
	deleteById: function (req, res, next) {
		CollectionModel.findByIdAndRemove(req.params.collectionId, function (err, collectionInfo) {
			if (err)
				next(err);
			else {
				res.json({status:"success", message: "Collection Delete!!!", data: null});
			}
		});
    },
    
	create: function (req, res, next) {
		CollectionModel.create({ name: req.body.name }, function (err, result) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: `Collection Create !!`, data: null });
			}
		});
	}
}