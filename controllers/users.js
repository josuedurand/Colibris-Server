const
	models = require('../models/models'),
	jwt = require('jsonwebtoken'),
	ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
	create: function (request, response, next) {
		let collegesArray = [];
		for (let index = 0; index < request.body.colleges.length; index++) {
			collegesArray.push({ _id: new ObjectId(request.body.colleges[index]) })
		}

		models["Users"].create({
			_id: new ObjectId(),
			civility: request.body.civility,
			lastName: request.body.lastName,
			firstName: request.body.firstName,
			email: request.body.email,
			password: request.body.password,
			profil: request.body.profil,
			colleges_extId: collegesArray
		}, function (error, result) {
			if (error) {
				next(error);
			} else {
				response.json({
					status: "success",
					message: "Utilisateur ajouté avec succés",
					data: null
				});
			}
		});
	},
	getAll: function (request, response) {
		models["Users"]
			.find({})
			.populate('colleges_extId')
			.lean()
			.exec(function (error, result) {
				if (error) {
					next(error);
				} else {
					response.status(200).json({
						status: "success",
						message: "Liste des utilisateurs trouvée avec succés.",
						data: { users: result }
					});
				}
			});
	},
	getById: function (request, response, next) {
		models['Users']
			.findById(request.params.userId)
			.populate('colleges_extId')
			.lean()
			.exec(function (error, result) {
				if (error) {
					next(error);
				} else {
					if (!result) {
						response.json({
							status: "success",
							message: `Utilisateur ${request.params.userId} introuvable.`,
							data: { user: result }
						});
					} else {
						response.json({
							status: "success",
							message: `Utilisateur ${request.params.userId} trouvé avec succés.`,
							data: { user: result }
						});
					}
				}
			});
	},
	updateById: function (request, response, next) {
		function passwordCall() {
			let password = request.body.password;
			return new Promise(changePassword => {
				if (request.body.password === null || request.body.password === '' || request.body.password === undefined) {
					models['Users'].findOne({
						_id: request.params.userId
					}, (error, user, next) => {
						if (error) {
							next(error);
						}
						changePassword(user.password)
					});
				} else {
					changePassword(password);
				}
			});
		}

		(async function asyncCall() {
			models['Users'].findByIdAndUpdate(request.params.userId, {
				civility: request.body.civility,
				lastName: request.body.lastName,
				firstName: request.body.firstName,
				email: request.body.email,
				password: password = await passwordCall(),
				profil: request.body.profil,
				colleges_extId: request.body.colleges
			}, function (error, user) {
				if (error)
					next(error);
				else {
					response.json({
						status: "success",
						message: `Utilisateur ${request.params.userId} mis à jour avec succés.`,
						data: null
					});
				}
			});
		})()
		// asyncCall();
	},
	deleteById: function (request, response, next) {
		models['Users'].findByIdAndRemove(request.params.userId, function (error, user) {
			if (error)
				next(error);
			else {
				response.json({
					status: "success",
					message: `Utilisateur ${request.params.userId} supprimé avec succés.`,
					data: null
				});
			}
		});
	},
	authenticate: function (request, response, next) {
		models["Users"].findOne({
			email: request.body.email
		}, function (error, userInfo) {
			if (error) {
				next(error);
			} else {
				if (bcrypt.compareSync(request.body.password, userInfo.password)) {
					const token = jwt.sign({
						id: userInfo.userId
					}, request.app.get('secretKey'), {
						expiresIn: '1h'
					});
					response.json({
						status: "success",
						message: "Utilisateur trouvé avec succés.",
						data: {
							user: userInfo,
							token: token
						}
					});
				} else {
					response.json({
						status: "error",
						message: "email/password invalide.",
						data: null
					});
				}
			}
		});
	}
}
