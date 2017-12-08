var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

const SpotifyStrategy = require('passport-spotify').Strategy;

// var consolidate = require('consolidate');

var appKey = 'ed36a056ee504173a3889b2e55cbd461';
var appSecret = '28184e92635b420eb7a74a91a2e9a392';

/**
* Specifies what strategy we'll use
*/
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        // User.findById(id, function(err, user) {
            done(null, obj);
        // });
    });

    // Registration Strategy
    passport.use(new SpotifyStrategy({
        clientID: appKey,
        clientSecret: appSecret,
        callbackURL: 'http://localhost:8888/auth/spotify/callback'
        // usernameField : 'email',
        // passwordField : 'password',
    },
        function(accessToken, refreshToken, profile, done){
            process.nextTick(function(){
                var newUser = new User();
                newUser.profile = profile;
                newUser.accessToken = accessToken;
                newUser.refreshToken = refreshToken;
                return done(null, newUser);
            });
    }));

    // Login Strategy
    // passport.use(new SpotifyStrategy({
    //     clientID: appKey,
    //     clientSecret: appSecret,
    //     callbackURL: 'http://localhost:8888/callback'
        
    // },
    // function(accessToken, refreshToken, profile, done){
    //     process.nextTick(function(){
    //         return done(null, profile);
    //     });
    // // function(email, password, done) {
    // //     User.findOne({'email': email}, function(err, user) {
    // //         if ( err ) {
    // //             return done(err);
    // //         } else if ( !user || !user.validPassword(password) ) {
    // //             return done(null, false);
    // //         }

    // //         return done(null, user);
    // //     });
    // }));
};
