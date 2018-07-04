
const
	express     = require('express'),
	cors        = require('cors'),
	mongoose    = require('./database'),
	logger      = require('morgan'),
	bodyParser  = require('body-parser'),
	jwt         = require('jsonwebtoken'),
	users       = require('./routes/users'),
	editions    = require('./routes/editions');
	// series      = require('./routes/series'),
	// collections = require('./routes/collections'),
	// publishers  = require('./routes/publishers'),
	// colleges    = require('./routes/colleges'),
	// bookings    = require('./routes/bookings'),
	// comments    = require('./routes/comments');

// Cree un instance de express
const app = express();

// Corrige les problemes d'access HTTP multiples
app.use(cors());

// Secret token pour JWT
app.set('secretKey', require('./config/jwt').key);

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (request, response) {
	response.status(200).json({ 'message': 'API Démarrée.' });
});

// Routes
app.use('/users', users);
app.use('/editions', editions);
// app.use('/series', series);
// app.use('/bookings', bookings);
// app.use('/collecitons', collecitons);
// app.use('/colleges', colleges);
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

// Renvoye la validation de l'utilisateur 
function validateUser(request, response, next) {
	jwt.verify(request.headers['x-access-token'], request.app.get('secretKey'), function (error, decoded) {
		if (error) {
			// Ajouter le status  // .status(404)
			response.json({ status: 'error', message: error.message, data: null });
		} else {
			// add user id to request
			request.body.userId = decoded.id;
			next();
		}
	});
}

// Pour express, l'erreur 404 n'est pas une erreur
// Gere l'erreur 404
app.use(function (request, response, next) {
	let error = new Error('Not Found');
	error.status = 404;
	next(error);
});
app.use(function (error, request, response, next) {
	console.log(error);

	if (error.status === 404) {
		response.status(404).json({ message: 'Erreur 404 : Page introuvable.' });
	} else {
		response.status(500).json({ message: 'Erreur 500 : Le serveur ne repond pas.' });
	}
});

// Lance le serveur
app.listen(3000, function () {
	console.log('\x1b[34m%s\x1b[0m', 'Serveur node lancé sur le port 3000.');
});
