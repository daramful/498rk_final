var LocalStrategy = require('passport-local').Strategy;
var SpotifyStrategy = require('passport-spotify').Strategy;
var User = require('../models/user');
var axios = require('axios');

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

    // Registration Strategy
    passport.use(new SpotifyStrategy({
        clientID: appKey,
        clientSecret: appSecret,
        callbackURL: 'http://localhost:8888/auth/spotify/callback'
    },
        function(accessToken, refreshToken, profile, done){
            process.nextTick(function(){
                var userInfo = axios.get('https://api.spotify.com/v1/me', { headers: { 'Authorization': 'Bearer' + accessToken } });

                User.findOne({'id': userInfo.id}, function(err,user) {
                    if(user) {
                        return done(null, user);
                    }
                    else {
                        var newUser = new User();
                        newUser.email = userInfo.email;
                        newUser.displayName = userInfo.displayName;
                        
        
                        //return done(null,newUser);
        
                        newUser.save(function(err) {
                            if(err) {
                                return done(err);
                            }
                            return done(null, newUser);
                        });
                    }
                });
                /*
                var newUser = new User();
                newUser.id = userInfo.id;
                newUser.email = userInfo.email;
                newUser.accessToken = accessToken;
                newUser.refreshToken = refreshToken;

                //return done(null,newUser);

                newUser.save(function(err) {
                    if(err) {
                        return done(err);
                    }
                    return done(null, newUser);
                });
                */
            });
    }));
};
