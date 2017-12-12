var path = require('path'),
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	passport = require('passport'),
	config = require('./config'),
	User = require('./'),
	router = express.Router(),
	cookieSession = require('cookie-session'),
	cookieParser = require('cookie-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');

const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
				 
Mongoose.connect(config.dbUri, { useMongoClient: true } );

app.use(express.static('./backend/static/'));
app.use(express.static('./frontend/dist/'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Static routes
app.route('/').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/startParty').get(function(req,res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})
app.route('/joinParty').get(function(req,res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})
app.route('/contact').get(function(req,res) {
	return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})
app.route('/about').get(function(req,res) {
	return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})
app.route('/authenticate').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
/* New things ================================================================ */

require('./backend/models').connect(config.dbUri);
require('./backend/auth/passport')(passport);

// Initialize cookie sessions
app.use(cookieParser());
app.use(methodOverride());
// app.use(session({ secret: 'keyboard cat' }));
app.use(cookieSession({
  keys: ['asdf', 'asdf']
}));


// Initialize Passport
app.use(passport.initialize()); // Create an instance of Passport
app.use(passport.session());

// Get our routes
app.use('/', require('./backend/routes/server')(router, passport));
/* =========================================================================== */

// start the server

app.listen(process.env.PORT || 8888, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
/*
app.listen(8888, () => {
  console.log('Server is running on http://localhost:8888');
});
*/
