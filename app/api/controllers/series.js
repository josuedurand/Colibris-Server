
const serieModel = require('../models/series');

module.exports = {
	getById: function (req, res, next) {
		console.log(req.body);
		serieModel.findById(req.params.serieId, function (err, serieInfo) {
			if (err) {
				next(err);
			} else {
				res.json({ status: "success", message: `Série ${req.params.serieId} trouvé avec succés.`, data: { series: serieInfo } });
			}
		});
	},
	getAll: function (req, res, next) {
		let seriesList = [];
		serieModel.find({}, function (err, series) {
			if (err) {
				next(err);
			} else {
				for (let serie of series) {
					seriesList.push({
						id: serie._id,
						// faire un populate
						college: serie.college,
						barCode: serie.barCode,
						quantity: serie.quantity,
						classLevel: serie.classLevel,
						status: serie.status,
						disponibility: serie.disponibility
					});
				}
				res.json({ status: "success", message: "Liste des séries trouvé avec succés.", data: { series: seriesList } });
			}
		});
	},
	updateById: function (req, res, next) {
		serieModel.findByIdAndUpdate(req.params.serieId, { name: req.body.name }, function (err, serieInfo) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: `Série ${req.params.serieId} mise à jour avec succés.`, data: null });
			}
		});
	},
	deleteById: function (req, res, next) {
		serieModel.findByIdAndRemove(req.params.serieId, function (err, serieInfo) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: `Série ${req.params.serieId} supprimé avec succés.`, data: null });
			}
		});
	},
	create: function (req, res, next) {
		serieModel.create({ name: req.body.name, released_on: req.body.released_on }, function (err, result) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: `Série ajouté avec succés.`, data: null });
			}
		});
	}
}