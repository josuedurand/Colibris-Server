const
	models = require('../models/models'),
	ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
	create: function (request, response, next) {
		models['Editions'].create({
			author: request.body.author,
			title: request.body.title,
			language: request.body.language,
			publishedDate: request.body.publishedDate,
			pages: request.body.pages,
			cover: request.body.cover,
			ISBN: request.body.ISBN,
			collections_extId: { _id: new ObjectId(request.body.collections) },
			series_extId: []
		}, function (error, result) {
			if (error)
				next(error);
			else {
				response.json({
					status: "success",
					message: `Edition ajouté avec succés.`,
					data: null
				});
			}
		});
	},
	getAll: function (request, response, next) {
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
					response
						.status(200)
						.json({
							status: "success",
							message: "Edition trouvé avec succés.",
							data: { editions: result }
						});

				}
			});
	},
	getById: function (request, response, next) {
		models['Editions']
			.findById(request.params.editionId)
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
						response.json({
							status: "success",
							message: `Editions ${request.params.editionId} introuvable.`,
							data: { editions: result }
						});
					} else {
						response.json({
							status: "success",
							message: `Editions ${request.params.editionId} trouvé avec succés.`,
							data: { editions: result }
						});
					}
				}
			});
	},
	getByIdNoSeriesPopulate: function (request, response, next) {
		models['Editions']
			.findById(request.params.editionId)
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
						response.json({
							status: "success",
							message: `Editions ${request.params.editionId} introuvable.`,
							data: { editions: result }
						});
					} else {
						response.json({
							status: "success",
							message: `Editions ${request.params.editionId} trouvé avec succés.`,
							data: { editions: result }
						});
					}
				}
			});
	},
	updateById: function (request, res, next) {
		models['Editions'].findByIdAndUpdate(request.params.editionId, {
			author: request.body.author,
			title: request.body.title,
			language: request.body.language,
			publishedDate: request.body.publishedDate,
			pages: request.body.pages,
			cover: request.body.cover,
			ISBN: request.body.ISBN,
			collections_extId: { _id: new ObjectId(request.body.collections) },
			series_extId: request.body.series_extId,
		}, function (error, result) {
			if (error)
				next(error);
			else {
				response.json({
					status: "success",
					message: `Edition ${request.params.editionId} mise à jour avec succés.`,
					data: null
				});
			}
		});
	},
	deleteById: function (request, res, next) {
		models['Editions'].findByIdAndRemove(request.params.serieId, function (err, serieInfo) {
			if (error)
				next(error);
			else {
				res.json({
					status: "success",
					message: `Edition ${request.params.serieId} supprimé avec succés.`,
					data: null
				});
			}
		});
	}
}
