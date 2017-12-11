const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const passportLocal = require('passport-local');
const passportSpotify = require('passport-spotify');
const config = require('./config');
const User = require('./')
const router = express.Router();
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');

app.use(express.static('./backend/static/'));
app.use(express.static('./frontend/dist/'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

// Static routes
app.route('/').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/login').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/signup').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/dashboard').get(function(req,res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})

var configDB = require('./config/index.json');
mongoose.connect(configDB.dbUri);

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
app.use(flash());

// Get our routes
app.use('/', require('./backend/routes/api')(router, passport));
const authRoutes = require('./backend/routes/api')(router, passport);
app.use('/auth', authRoutes);
/* =========================================================================== */

// start the server
app.listen(8888, () => {
  console.log('Server is running on http://localhost:8888');
});