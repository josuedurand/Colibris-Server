
const models = require('../models/models');

module.exports = {
	getById: function (req, res, next) {
		console.log(req.body);
		models['Series'].findById(req.params.serieId, function (err, serieInfo) {
			if (err) {
				next(err);
			} else {
				res.json({ status: "success", message: `Série ${req.params.serieId} trouvé avec succés.`, data: { series: serieInfo } });
			}
		});
	},
	// getAll: function (req, res, next) {
	// 	let seriesList = [];
	// 	models['Series'].find({}, function (err, series) {
	// 		if (err) {
	// 			next(err);
	// 		} else {
	// 			for (let serie of series) {
	// 				seriesList.push({
	// 					id: serie._id,
	// 					barCode: serie.barCode,
	// 					quantity: serie.quantity,
	// 					classLevel: serie.classLevel,
	// 					status: serie.status,
	// 					disponibility: serie.disponibility,
	// 					// faire un populate
	// 					college: serie.college,
	// 					// faire un populate
	// 					edition: serie.edition,

	// 				});
	// 			}
	// 			res.json({ status: "success", message: "Liste des séries trouvé avec succés.", data: { series: seriesList } });
	// 		}
	// 	});
	// },
	getAll: function (req, res, next) {
		models['Series']
			.find({})
			.populate('colleges_extId')
			.populate('editions_extId')
			.lean()
			.exec((error, result) => {
				if (error) {
					throw error;
				} else {
					/** todo : ici parcourir le tableau series en retour des populates 
					 * pour récupérer les _id des collections
					*/

				
				}
			});
		// 	res
		// 	.status(200)
		// 	.json({
		// 		status: "success",
		// 		message: "Liste des séries trouvé avec succés.",
		// 		data: { series: result }
		// });
	},
	updateById: function (req, res, next) {
		models['Series'].findByIdAndUpdate(req.params.serieId, { name: req.body.name }, function (err, serieInfo) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: `Série ${req.params.serieId} mise à jour avec succés.`, data: null });
			}
		});
	},
	deleteById: function (req, res, next) {
		models['Series'].findByIdAndRemove(req.params.serieId, function (err, serieInfo) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: `Série ${req.params.serieId} supprimé avec succés.`, data: null });
			}
		});
	},
	create: function (req, res, next) {
		models['Series'].create({ name: req.body.name, released_on: req.body.released_on }, function (err, result) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: `Série ajouté avec succés.`, data: null });
			}
		});
	}
}