
const
	express    = require('express'),
	cors       = require('cors'),
	mongoose   = require('./database'),
	logger     = require('morgan'),
	bodyParser = require('body-parser'),
	jwt        = require('jsonwebtoken'),
	users      = require('./routes/users'),
	series     = require('./routes/series');

// Cree un instance de express
const app = express();

// Corrige les problemes d'access HTTP multiples
app.use(cors());

// Secret token pour JWT
app.set('secretKey', require('./config/jwt').key);

// Se connecte a la base de données mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB erreur de connection:'));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
	res.json({ "message": "API Démarrée" });
});

// routes
app.use('/users', users);
app.use('/series', series);
// app.use('/booking', booking);
// app.use('/collecitons', booking);
// app.use('/colleges', booking);
// app.use('/editions', booking);
// app.use('/publishers', booking);

// app.use('/users', validateUser, users);
// app.use('/series', validateUser, series);
// app.use('/booking', validateUser, booking);
// app.use('/collecitons', validateUser, booking);
// app.use('/colleges', validateUser, booking);
// app.use('/editions', validateUser, booking);
// app.use('/publishers', validateUser, booking);

app.get('/favicon.ico', function (req, res) {
	res.sendStatus(204);
});

function validateUser(req, res, next) {
	jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
		if (err) {
			res.json({ status: "error", message: err.message, data: null });
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
		res.status(404).json({ message: "404 : Not found" });
	} else {
		res.status(500).json({ message: "Erreur serveur : 500" });
	}
});

// serveur lancé
app.listen(3000, function () {
	console.log('\x1b[34m%s\x1b[0m', 'Serveur node lancé sur le port 3000');
});