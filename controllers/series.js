
const models = require('../models/models');
// const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
	create: function (request, response, next) {
		let classLevelArray = [];
		for (let index = 0; index < request.body.classLevel.length; index++) {
			classLevelArray.push(Number(request.body.classLevel[index]) )
		}
		models['Series'].create({
			name: request.body.name,
			classLevel: classLevelArray,
			editions_extId:  ''
		}, function (error, result) {
			if (error)
				next(error);
			else {
				response.json({
					status: "success",
					message: `Série ajouté avec succés.`,
					data: null
				});
			}
		});
	},
	getAll: function (request, response, next) {
		models['Series']
			.find({})
			.populate('colleges_extId')
			.populate({
				path: 'editions_extId',
				populate: {
					path: 'collections_extId',
					model: models['Collections'],
					populate: {
						path: 'publishers_extId',
						model: models['Publishers']
					}
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
							message: "Liste des séries trouvé avec succés.",
							data: { series: result }
					});
				
				}
			});
	},
	getById: function (request, response, next) {
		console.log(request.body);
		models['Series'].findById(request.params.serieId, function (error, serieInfo) {
			if (error) {
				next(error);
			} else {
				response.json({
					status: "success",
					message: `Série ${request.params.serieId} trouvé avec succés.`,
					data: { series: serieInfo }
				});
			}
		});
	},
	updateById: function (request, response, next) {
		models['Series'].findByIdAndUpdate(request.params.serieId, { name: request.body.name }, function (error, serieInfo) {
			if (error)
				next(error);
			else {
				response.json({
					status: "success",
					message: `Série ${request.params.serieId} mise à jour avec succés.`,
					data: null
				});
			}
		});
	},
	deleteById: function (request, response, next) {
		models['Series'].findByIdAndRemove(request.params.serieId, function (error, serieInfo) {
			if (error)
				next(error);
			else {
				response.json({
					status: "success",
					message: `Série ${request.params.serieId} supprimé avec succés.`,
					data: null
				});
			}
		});
	}	
}
