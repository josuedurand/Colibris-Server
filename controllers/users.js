
const
	models     = require('../models/models'),
	jwt        = require('jsonwebtoken'),
	ObjectId   = require('mongoose').Types.ObjectId;

module.exports = {
	create: function (req, res, next) {
		let collegesArray = [];
		for (let index = 0; index < req.body.colleges.length; index++) {
			collegesArray.push({ _id: new ObjectId( req.body.colleges[index] ) })
		}

		models["Users"].create({
			_id: new ObjectId(),
			civility: req.body.civility,
			lastName: req.body.lastName,
			firstName: req.body.firstName,
			email: req.body.email,
			password: req.body.password,
			profil: req.body.profil,
			colleges_extId: collegesArray
		}, function (err, result) {
			if (err) {
				next(err);
			} else {
				res.json({
					status: "success",
					message: "Utilisateur ajouté avec succés",
					data: null
				});
			}
		});
	},
	getAll: function (req, res) {
		models["Users"].find({})
			.populate('colleges_extId')
			.lean()
			.exec(function (error, result) {
				if (error) {
					next(error);
				} else {
					res.status(200).json({
						status: "success",
						message: "Liste des utilisateurs trouvée avec succés.",
						data: {	users: result }
					});
				}
			});
	},
	getById: function (req, res, next) {
		models['Users'].findById(req.params.userId)
			.populate('colleges_extId')
			.lean()
			.exec(function (error, result) {
				if (error) {
					next(error);
				} else {
					if (!result) {
						res.json({
							status: "success",
							message: `Utilisateur ${req.params.userId} introuvable.`,
							data: { user: result }
						});
					} else {
						res.json({
							status: "success",
							message: `Utilisateur ${req.params.userId} trouvé avec succés.`,
							data: { user: result }
						});
					}
				}
			});
	},
	updateById: function (req, res, next) {
		function passwordCall() {
			let password = req.body.password;
			return new Promise( changePassword => {
				if (req.body.password === null || req.body.password === '' || req.body.password === undefined) {
					models['Users'].findOne({ _id: req.params.userId }, (error, user, next) => {
						if (error) {
							next(error);
						}
						changePassword(user.password);
					});
				} else {					
					changePassword(password);
				}
			});
		}

		(async function asyncCall() {
			models['Users'].findByIdAndUpdate(req.params.userId, {
				civility: req.body.civility,
				lastName: req.body.lastName,
				firstName: req.body.firstName,
				email: req.body.email,
				password: password = await passwordCall(),
				profil: req.body.profil,
				colleges_extId: req.body.colleges
			}, function (err, user) {
				if (err)
					next(err);
				else {
					res.json({
						status: "success",
						message: `Utilisateur ${req.params.userId} mis à jour avec succés.`,
						data: null
					});
				}
			});
		})()
		// asyncCall();
	},
	deleteById: function (req, res, next) {
		models['Users'].findByIdAndRemove(req.params.userId, function (err, user) {
			if (err)
				next(err);
			else {
				res.json({
					status: "success",
					message: `Utilisateur ${req.params.userId} supprimé avec succés.`,
					data: null
				});
			}
		});
	},
	authenticate: function (req, res, next) {
		models["Users"].findOne({
			email: req.body.email
		}, function (err, userInfo) {
			if (err) {
				next(err);
			} else {
				if (bcrypt.compareSync(req.body.password, userInfo.password)) {
					const token = jwt.sign({
						id: userInfo.userId
					}, req.app.get('secretKey'), {
						expiresIn: '1h'
					});
					res.json({
						status: "success",
						message: "Utilisateur trouvé avec succés.",
						data: {
							user: userInfo,
							token: token
						}
					});
				} else {
					res.json({
						status: "error",
						message: "email/password invalide.",
						data: null
					});
				}
			}
		});
	}
}
