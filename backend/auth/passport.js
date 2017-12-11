var LocalStrategy = require('passport-local').Strategy;
var SpotifyStrategy = require('passport-spotify').Strategy;
var User = require('../models/user');

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
        done(null, obj);
    });

    // Local Strategy
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req,email,password,done) {
        if(email) {
            email = email.toLowerCase();
        }
        
        process.nextTick(function() {
            User.findOne({'local.email': email}, function(err,user) {
                if(err) {
                    return done(err);
                }
                if(!user) {
                    return done(null,false,req.flash('loginMessage', 'No user found'));
                }
                if(!user.validPassword(password)) {
                    return done(null,false,req.flash('loginMessage', 'Wrong password'));
                }
                else {
                    return done(null,user);
                }
            });
        });
    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req,email,password,done) {
        if(email) {
            email = email.toLowerCase();
        }

        process.nextTick(function() {
            if(!req.user) {
                User.findOne({'local.email': email}, function(err,user) {
                    if(err) {
                        return done(err);
                    }
                    if(user) {
                        return done(null,false,req.flash('signupMessage', 'This email is already taken'));
                    }
                    else {
                        var newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save(function(err) {
                            if(err) {
                                return done(err);
                            }
                            return done(null, newUser);
                        });
                    }
                });
            }
            else if(!req.user.local.email) {
                User.findOne({'local.email': email}, function(err,user) {
                    if(err) {
                        return done(err);
                    }
                    if(user) {
                        return done(null,false,req.flash('loginMessage', 'This email is already Taken'));
                    }
                    else {
                        var user = req.user;
                        user.local.email = email;
                        user.local.password = user.generateHash(password);
                        user.save(function(err) {
                            if(err) {
                                return done(err);
                            }
                            return done(null, user);
                        });
                    }
                });
            }
            else {
                return done(null,req.user);
            }
        });
    }));

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
};
