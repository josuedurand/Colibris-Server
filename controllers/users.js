
const
	models   = require('../models/models'),
	bcrypt   = require('bcrypt'),
	jwt      = require('jsonwebtoken'),
	ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
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
					data: { users : result }
				});
			}
		});
},
getById: function (req, res, next) {
	// console.log(req.body);
	models['Users'].findById(req.params.userId)
		.populate('colleges_extId')
		.lean()
		.exec(function (error, result) {
			if (error) {
				next(error);
			} else {
				if (!result) {
					res.json({ status: "success", message: `Utilisateur ${req.params.userId} introuvable.`, data: { user: result } });
				} else {
					res.json({ status: "success", message: `Utilisateur ${req.params.userId} trouvé avec succés.`, data: { user: result } });
				}
			}
		});
},
create: function (req, res, next) {
	
	console.log('req.body', req.body);

	models["Users"].create({
			_id: new ObjectId(),
			civility: req.body.civility,
			lastName: req.body.lastName,
			firstName: req.body.firstName,
			email: req.body.email,
			password: req.body.password,
			profil: req.body.profil,
			colleges_extId: { _id: new ObjectId(req.body.colleges) }
		}, function (err, result) {
		if (err) {
			next(err);
		} else {
			res.json({ status: "success", message: "Utilisateur ajouté avec succés", data: null });
		}
	});
},
updateById: function (req, res, next) {
	models['Users'].findByIdAndUpdate(req.params.userId, { 
		civility: req.body.civility,
		lastName: req.body.lastName,
		firstName: req.body.firstName,
		email: req.body.email,
		password: req.body.password,
		profil: req.body.profil,
		colleges_extId: req.body.colleges
	}, function (err, user) {
		if (err)
			next(err);
		else {
			res.json({ status: "success", message: `Utilisateur ${req.params.userId} mis à jour avec succés.`, data: null });
		}
	});
},
deleteById: function (req, res, next) {
	models['Users'].findByIdAndRemove(req.params.userId, function (err, user) {
		if (err)
			next(err);
		else {
			res.json({ status: "success", message: `Utilisateur ${req.params.userId} supprimé avec succés.`, data: null });
		}
	});
},
authenticate: function (req, res, next) {
	models["Users"].findOne({ email: req.body.email }, function (err, userInfo) {
		if (err) {
			next(err);
		} else {
			if (bcrypt.compareSync(req.body.password, userInfo.password)) {
				const token = jwt.sign({ id: userInfo.userId }, req.app.get('secretKey'), { expiresIn: '1h' });
				res.json({ status: "success", message: "Utilisateur trouvé avec succés.", data: { user: userInfo, token: token } });
			} else {
				res.json({ status: "error", message: "email/password invalide.", data: null });
			}
		}
	});
}
}
