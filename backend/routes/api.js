var request = require('request');
var querystring = require('querystring');
var channel = require('../models/channel');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportSpotify = require('passport-spotify');

module.exports = function(router, passport) {
    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    }));

    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup',
    }));

    var client_id = 'ed36a056ee504173a3889b2e55cbd461';
    var client_secret = '28184e92635b420eb7a74a91a2e9a392';
    var redirect_uri = 'http://localhost:8888/auth/spotify/callback';

    router.get('/auth/spotify',
        passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: false}),
        function(req,res){     
    });

    router.get('/auth/spotify/callback',
        passport.authenticate('spotify', { failureRedirect: '/login' }),
        function(req,res){
                res.redirect('/dashboard');
    });
    
    router.get('/profile',
        isLoggedIn,
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user, message: "Welcome!" });
    });
    router.post('/channels/:id',
        isLoggedIn,
        function(req, res) {
            var channelPost = {
                name: req.params.id
            }
            channel.findOne({'name':req.params.id},function(err,channel_exist){
                if(err || channel_exist === null){
                    channel.create(channelPost,function(err,channeldata){
                        if(err){
                            res.status(500).send({
                                message: 'Internal Server Error',
                                data: []
                            })
                        }
                        else {
                            res.status(201).json({
                                message: "Channel "+req.params.id+"Successfully Created",
                                data:channeldata
                            })
                        }
                    })
                }
                else {
                    res.status(409).json({
                        message: "Existing Channel Name",
                        data:[]
                    })
                }
            })
            
    });

    router.get('/channels/:id',
        isLoggedIn,
        function(req, res) {
            channel.findOne({'name':req.params.id},function(err,channeldata){
                if(err || channeldata === null){
                    res.status(404).send({
                        message: 'Channel Not Found',
                        data: []
                    })
                }
                else {
                    res.status(200).json({
                        message: "channel to "+req.params.id+"success",
                        data:channeldata
                    })
                }
            })
    });

    router.put('/channels/:id',
        isLoggedIn,
        function(req, res) {
            channel.findOneAndUpdate({'name':req.params.id},{$push:req.body},{new:true},function(err,channeldata){
                if(err || channeldata === null){
                    res.status(404).send({
                        message: 'Channel Not Found',
                        data: []
                    })
                }
                else {
                    res.status(200).json({
                        message: "Channel "+req.params.id+"Successfully Updated",
                        data:channeldata
                    })
                    console.log(channeldata);
                }
            })
    });
    router.get('/logout', function(req, res) {
        req.logOut();
        res.status(200).json({ message: "logged out "});
    });

    return router;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "unable to auth" });
}
