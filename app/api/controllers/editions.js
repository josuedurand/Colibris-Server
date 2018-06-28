const EditionModel = require('../models/editions');

module.exports = {

	getById: function (req, res, next) {
		console.log(req.body);
		EditionModel.findById(req.params.editionId, function (err, editionInfo) {
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Edition found!!!", data:{edition: editionInfo}});
			}
		});
    },
    
	getAll: function (req, res, next) {
		let editionsList = [];
		EditionModel.find({}, function (err, editions) {
			if (err) {
				next(err);
			} else {
				for (let edition of editions) {
					editionsList.push({
						id: edition._id,
						title: edition.title,
						language: edition.language,
                        publishedDate: edition.publishedDate,
                        pages: edition.pages,
						cover: edition.cover,
                        ISBN: edition.zipCode
					});
				}
				res.json({ status: "success", message: "Liste des éditions trouvé avec succés.", data: { editions: editionsList } });
			}
		});
    },
    
	updateById: function (req, res, next) {
		EditionModel.findByIdAndUpdate(req.params.editionId, { title: req.body.title, language: req.body.language, publishedDate: req.body.publishedDate, pages: req.body.pages, cover: req.body.cover, ISBN: req.body.ISBN }, function (err, editionInfo) {
			if (err)
				next(err);
			else {
				res.json({status:"success", message: "Edition Update!!!", data:null});
			}
		});
    },
    
	deleteById: function (req, res, next) {
		EditionModel.findByIdAndRemove(req.params.editionId, function (err, editionInfo) {
			if (err)
				next(err);
			else {
				res.json({status:"success", message: "Edition Delete!!!", data: null});
			}
		});
    },
    
	create: function (req, res, next) {
		EditionModel.create({ title: req.body.title, language: req.body.language, publishedDate: req.body.publishedDate, pages: req.body.pages, cover: req.body.cover, ISBN: req.body.ISBN }, function (err, result) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: `Edition Create !!`, data: null });
			}
		});
	}
}