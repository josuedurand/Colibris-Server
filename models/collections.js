const mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;
const CollectionSchema = new Schema({ 
	name: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('Collection', CollectionSchema);