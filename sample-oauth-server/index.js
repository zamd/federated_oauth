require('dotenv').config();

const app = require('express')(),
		session = require('express-session'),
		passport = require('./setupPassport'),
		oauthServer = require('./oauth-server'),
		bodyParser = require('body-parser'),
		morgan = require('morgan'),
		debug = require('debug')('sample-server');

//TODO: Fix storing full object in session.
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: '3232322', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.get('/login/callback', passport.authenticate("auth0"), (req, res) => res.redirect(req.session.returnTo));
app.get('/login', (req, res, next) => passport.authenticate("auth0", {
		scope: req.params.scope || "openid read:tickets"
})(req, res, next));
app.use('/', oauthServer);

function startServer() {
		debug('starting server...');
		var port = process.env.PORT || 1443;
		app.listen(port, function () {
				debug(`started on ${port}`);
		});
}

startServer();
