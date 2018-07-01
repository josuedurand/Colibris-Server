
const
	userModel = require('../models/users'),
	bcrypt    = require('bcrypt'),
	jwt       = require('jsonwebtoken');

module.exports = {
	create: function (req, res, next) {
		userModel.create({
				civility: req.body.civility,
				lastName: req.body.lastName,
				firstName: req.body.firstName,
				email: req.body.email,
				password: req.body.password,
				profil: req.body.profil,
				college: req.body.college
			}, function (err, result) {
			if (err) {
				next(err);
			} else {
				res.json({ status: "success", message: "Utilisateur ajouté avec succés.", data: null });
			}
		});
	},
	authenticate: function (req, res, next) {
		userModel.findOne({ email: req.body.email }, function (err, userInfo) {
			if (err) {
				next(err);
			} else {
				if (bcrypt.compareSync(req.body.password, userInfo.password)) {
					const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
					res.json({ status: "success", message: "Utilisateur trouvé avec succés.", data: { user: userInfo, token: token } });
				} else {
					res.json({ status: "error", message: "email/password invalide.", data: null });
				}
			}
		});
	}
}