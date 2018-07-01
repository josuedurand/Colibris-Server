const collegeModel = require('../models/colleges');

module.exports = {

	getById: function (req, res, next) {
		console.log(req.body);
		collegeModel.findById(req.params.collegeId, function (err, collegeInfo) {
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "College found!!!", data:{college: collegeInfo}});
			}
		});
    },
    
	getAll: function (req, res, next) {
		let collegesList = [];
		collegeModel.find({}, function (err, colleges) {
			if (err) {
				next(err);
			} else {
				for (let college of colleges) {
					collegesList.push({
						id: college._id,
						name: college.name,
						phoneCDI: college.phoneCDI,
                        address1: college.address1,
                        address2: college.address2,
						city: college.city,
                        zipCode: college.zipCode,
                        uai: college.uai
					});
				}
				res.json({ status: "success", message: "Liste des collèges trouvé avec succés.", data: { colleges: collegesList } });
			}
		});
    },
    
	updateById: function (req, res, next) {
		collegeModel.findByIdAndUpdate(req.params.collegeId, { name: req.body.name, phoneCDI: req.body.phoneCDI, address1: req.body.address1, address2: req.body.address2, city: req.body.city, zipCode: req.body.zipCode, uai: req.body.uai }, function (err, collegeInfo) {
			if (err)
				next(err);
			else {
				res.json({status:"success", message: "Collège Update!!!", data:null});
			}
		});
    },
    
	deleteById: function (req, res, next) {
		collegeModel.findByIdAndRemove(req.params.collegeId, function (err, collegeInfo) {
			if (err)
				next(err);
			else {
				res.json({status:"success", message: "Collège Delete!!!", data: null});
			}
		});
    },
    
	create: function (req, res, next) {
		collegeModel.create({ name: req.body.name, phoneCDI: req.body.phoneCDI, address1: req.body.address1, address2: req.body.address2, city: req.body.city, zipCode: req.body.zipCode, uai: req.body.uai }, function (err, result) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: `Collège Create !!`, data: null });
			}
		});
	}
}