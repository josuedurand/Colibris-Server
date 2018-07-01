const 
	mongoose = require('mongoose'),
	Schema   = mongoose.Schema,
	ObjectId = mongoose.Schema.Types.ObjectId;

const SerieSchema = new Schema({   
	college: {
		type: ObjectId,
		ref: 'colleges',
		trim: true,
		required: true,
	},
    barCode: {
        type: Number,
        trim: true,
        required: true,
    },
    quantity: {
        type: Number,
        trim: true,
        required: true,
    },
    classLevel: {
        type: [Number],
        min: 3,
        max: 6,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        trim: true,
        required: true,
    },
    disponibility: {
        type: String,
        trim: true,
        required: true,
    }
});

module.exports = mongoose.model('Serie', SerieSchema);
