const mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;
const CommentSchema = new Schema({ 
	comment: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);