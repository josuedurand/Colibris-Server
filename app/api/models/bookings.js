const mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;
const BookingSchema = new Schema({ 
	startDate: {
        type: Date,
        trim: true,
        required: true
    },
    endDate: {
        type: Date,
        trim: true,
        required: true
    },
    requestDate: {
        type: Date,
        trim: true,
        required: true
    },
    decisionDate: {
        type: Date,
        trim: true,
        required: true
    },
    status: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('Booking', BookingSchema);