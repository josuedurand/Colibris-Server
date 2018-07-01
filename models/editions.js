const mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;
const EditionSchema = new Schema({ 
	title: {
        type: String,
        trim: true,
        required: true
    },
    language: {
        type: String,
        trim: true,
        required: true
    },
    publishedDate: {
        type: Date,
        trim: true,
        required: true
    },
    pages: {
        type: Number,
        trim: true,
        required: false
    },
    cover: {
        type: String,
        trim: true,
        required: true
    },
    ISBN: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('Edition', EditionSchema);