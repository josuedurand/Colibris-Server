const mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;
const CollegeSchema = new Schema({  
	name: {
        type: String,
        trim: true,
        required: true
    },
    phoneCDI: { // ne peux pas commencer par 0
        type: Number,
        //max: 10,
        //min: 10,
        trim: true,
        required: true
    },
    address1: {
        type: String,
        trim: true,
        required: true
    },
    address2: {
        type: String,
        trim: true,
        required: false
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    zipCode: {
        type: Number,
        trim: true,
        required: true
    },
    uai: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('College', CollegeSchema);