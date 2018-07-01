const CommentModel = require('../models/comments');

module.exports = {

	getById: function (req, res, next) {
		console.log(req.body);
		CommentModel.findById(req.params.commentId, function (err, commentInfo) {
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Comment found!!!", data:{comment: commentInfo}});
			}
		});
    },
    
	getAll: function (req, res, next) {
		let commentsList = [];
		CommentModel.find({}, function (err, comments) {
			if (err) {
				next(err);
			} else {
				for (let comment of comments) {
					commentsList.push({
						id: comment._id,
                        comment: comment.comment,
                        date: comment.date
					});
				}
				res.json({ status: "success", message: "Liste des commentaires trouvé avec succés.", data: { comments: commentsList } });
			}
		});
    },
    
	updateById: function (req, res, next) {
		CommentModel.findByIdAndUpdate(req.params.commentId, { comment: req.body.comment, date: req.body.date }, function (err, commentInfo) {
			if (err)
				next(err);
			else {
				res.json({status:"success", message: "Comment Update!!!", data:null});
			}
		});
    },
    
	deleteById: function (req, res, next) {
		CommentModel.findByIdAndRemove(req.params.commentId, function (err, commentInfo) {
			if (err)
				next(err);
			else {
				res.json({status:"success", message: "Comment Delete!!!", data: null});
			}
		});
    },
    
	create: function (req, res, next) {
		CommentModel.create({ comment: req.body.comment, date: req.body.date }, function (err, result) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: `Comment Create !!`, data: null });
			}
		});
	}
}