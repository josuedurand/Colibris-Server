
const
	models   = require('../models/models'),
	bcrypt   = require('bcrypt'),
	jwt      = require('jsonwebtoken'),
	ObjectId = require('mongoose').Types.ObjectId;

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
				console.log('req.body.password', req.body.password);
				if (req.body.password === null || req.body.password === '' || req.body.password === undefined) {
					console.log('Entre dans if')
					models['Users'].findOne({ _id: req.params.userId }, (error, user, next) => {
						if (error) {
							next(error);
						}
						console.log('user', user)
						changePassword(user.password);
					});
					console.log('password dan if', password);
				} else {
					console.log('else', req.body.password);
					console.log('else password', password);
					
					changePassword(password);
				}
			});
		}

		async function asyncCall() {
			
			console.log('calling');
			models['Users'].findByIdAndUpdate(req.params.userId, {
				printData: () => console.log('coucou'),
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
					console.log(user);
					res.json({
						status: "success",
						message: `Utilisateur ${req.params.userId} mis à jour avec succés.`,
						data: null
					});
				}
			});
			// var result = await resolveAfter2Seconds();
			// console.log(result);
			// expected output: "resolved"
		}
		asyncCall();
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
