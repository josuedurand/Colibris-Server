
const
	models = require('../models/models'),
	ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
	create: function (req, res, next) {
		models['Editions'].create({
			author: req.body.author,
			title: req.body.title,
			language: req.body.language,
			publishedDate: req.body.publishedDate,
			pages: req.body.pages,
			cover: req.body.cover,
			ISBN: req.body.ISBN,
			collections_extId: {
				_id: new ObjectId(req.body.collections)
			},
			series_extId: []
		}, function (err, result) {
			if (err)
				next(err);
			else {
				res.json({
					status: "success",
					message: `Edition ajouté avec succés.`,
					data: null
				});
			}
		});
	},
	getAll: function (req, res, next) {
		models['Editions']
			.find({})
			.populate({
				path: 'collections_extId',
				model: models['Collections'],
				populate: {
					path: 'publishers_extId',
					model: models['Publishers']
				}
			})
			.populate({
				path: 'series_extId',
				model: models['Series'],
				populate: {
					path: 'colleges_extId',
					model: models['Colleges'],
				}
			})
			.lean()
			.exec((error, result) => {
				if (error) {
					throw error;
				} else {
					res
						.status(200)
						.json({
							status: "success",
							message: "Edition trouvé avec succés.",
							data: {
								editions: result
							}
						});

				}
			});
	},
	getById: function (req, res, next) {
		models['Editions'].findById(req.params.editionId)
			.populate({
				path: 'collections_extId',
				model: models['Collections'],
				populate: {
					path: 'publishers_extId',
					model: models['Publishers']
				}
			})
			.populate({
				path: 'series_extId',
				model: models['Series'],
				populate: {
					path: 'colleges_extId',
					model: models['Colleges'],
				}
			})
			.lean()
			.exec(function (error, result) {
				if (error) {
					next(error);
				} else {
					if (!result) {
						res.json({
							status: "success",
							message: `Editions ${req.params.editionId} introuvable.`,
							data: { editions: result }
						});
					} else {
						res.json({
							status: "success",
							message: `Editions ${req.params.editionId} trouvé avec succés.`,
							data: { editions: result }
						});
					}
				}
			});
	},
	getByIdNoSeriesPopulate: function (req, res, next) {
		models['Editions'].findById(req.params.editionId)
			.populate({
				path: 'collections_extId',
				model: models['Collections'],
				populate: {
					path: 'publishers_extId',
					model: models['Publishers']
				}
			})
			.lean()
			.exec(function (error, result) {
				if (error) {
					next(error);
				} else {
					if (!result) {
						res.json({
							status: "success",
							message: `Editions ${req.params.editionId} introuvable.`,
							data: { editions: result }
						});
					} else {
						res.json({
							status: "success",
							message: `Editions ${req.params.editionId} trouvé avec succés.`,
							data: { editions: result }
						});
					}
				}
			});
	},
	updateById: function (req, res, next) {
		models['Editions'].findByIdAndUpdate(req.params.editionId, {
			author: req.body.author,
			title: req.body.title,
			language: req.body.language,
			publishedDate: req.body.publishedDate,
			pages: req.body.pages,
			cover: req.body.cover,
			ISBN: req.body.ISBN,
			collections_extId: {
				_id: new ObjectId(req.body.collections)
			},
			series_extId: req.body.series_extId,
		}, function (err, result) {
			if (err)
				next(err);
			else {
				res.json({
					status: "success",
					message: `Edition ${req.params.editionId} mise à jour avec succés.`,
					data: null
				});
			}
		});
	},
	deleteById: function (req, res, next) {
		models['Editions'].findByIdAndRemove(req.params.serieId, function (err, serieInfo) {
			if (err)
				next(err);
			else {
				res.json({
					status: "success",
					message: `Edition ${req.params.serieId} supprimé avec succés.`,
					data: null
				});
			}
		});
	}
}
