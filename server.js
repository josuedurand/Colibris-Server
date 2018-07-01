
const
	express     = require('express'),
	cors        = require('cors'),
	mongoose    = require('./database'),
	logger      = require('morgan'),
	bodyParser  = require('body-parser'),
	jwt         = require('jsonwebtoken'),
	users       = require('./routes/users'),
	series      = require('./routes/series');
	// collections = require('./routes/collections'),
	// publishers  = require('./routes/publishers'),
	// colleges    = require('./routes/colleges'),
	// editions    = require('./routes/editions'),
	// bookings    = require('./routes/bookings'),
	// comments    = require('./routes/comments');

// Cree un instance de express
const app = express();

// Corrige les problemes d'access HTTP multiples
app.use(cors());

// Secret token pour JWT
app.set('secretKey', require('./config/jwt').key);

// Se connecte a la base de données mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB erreur de connection :'));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
	res.status(200).json({ 'message': 'API Démarrée.' });
});

// routes
app.use('/users', users);
app.use('/series', series);
// app.use('/bookings', bookings);
// app.use('/collecitons', collecitons);
// app.use('/colleges', colleges);
// app.use('/editions', editions);
// app.use('/publishers', publishers);
// app.use('/comments', comments);

// app.use('/users', validateUser, users);
// app.use('/series', validateUser, series);
// app.use('/bookings', validateUser, bookings);
// app.use('/collecitons', validateUser, collecitons);
// app.use('/colleges', validateUser, colleges);
// app.use('/editions', validateUser, editions);
// app.use('/publishers', validateUser, publishers);
// app.use('/comments', validateUser, comments);

// app.get('/favicon.ico', function (req, res) {
// 	res.sendStatus(204);
// });

function validateUser(req, res, next) {
	jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
		if (err) {
			// Ajouter le status  // .status(404)
			res.json({ status: 'error', message: err.message, data: null });
		} else {
			// add user id to request
			req.body.userId = decoded.id;
			next();
		}
	});
}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});
// handle errors
app.use(function (err, req, res, next) {
	console.log(err);

	if (err.status === 404) {
		res.status(404).json({ message: 'Erreur 404 : Page introuvable.' });
	} else {
		res.status(500).json({ message: 'Erreur 500 : Le serveur ne repond pas.' });
	}
});

// serveur lancé
app.listen(3000, function () {
	console.log('\x1b[34m%s\x1b[0m', 'Serveur node lancé sur le port 3000.');
});