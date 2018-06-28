
const
	mongoose   = require('mongoose'),
	bcrypt     = require('bcrypt'),
	saltRounds = 10,
	Schema     = mongoose.Schema,
	ObjectId   = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
	civility: {
		type: String,
		trim: true,
		required: true,
	},
	lastName: {
		type: String,
		trim: true,
		required: true,
	},
	firstName: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	profil: {
		type: String,
		trim: true,
		required: true,
	},
	college: {
		type: ObjectId,
		ref: 'colleges',
		trim: true,
		required: true,
	},
	// A ajouter si le compte est créé avec le formulaire d'inscription (pour professeur)
	// Si cree par un admin passer a true
	// validate: {
	// 	type: Boolean,
	// 	default: false,
	// 	trim: true,
	// 	required: true
	// }
});

// hash user password before saving into database
UserSchema.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

module.exports = mongoose.model('User', UserSchema);
