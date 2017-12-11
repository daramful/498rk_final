var request = require('request');
var querystring = require('querystring');
var channel = require('../models/channel');
const mongoose = require('mongoose'); // you must have this
const ObjectId = mongoose.Types.ObjectId; // gets the function

var Pusher = require('pusher');

module.exports = function(router, passport) {

    // router.post('/register',
    //     passport.authenticate('spotify-signup'),
    //     function(req, res) {
    //         res.status(200).json({ user: req.user.email
    //     });
    // });
    var client_id = 'ed36a056ee504173a3889b2e55cbd461';
    var client_secret = '28184e92635b420eb7a74a91a2e9a392';
    var redirect_uri = 'http://localhost:8888/auth/spotify/callback';

    var pusher = new Pusher({
        appId: '443456',
        key: '64fe71b3db1ab2a99821',
        secret: '6e00cf0eabd20421bdb1',
        cluster: 'us2'
      });
  

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
                                message: "Channel "+ req.params.id + "Successfully Created",
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

    router.get('/channels', isLoggedIn, function(req, res) {
        channel.find({}, function(err, channeldata) {
            var arr = []
            var channelMap = {};
            console.log('channelMap:');
            console.log(channelMap);
            channeldata.forEach((chn)=> {
                console.log(chn)
                arr = chn
            });
                if(err || channeldata === null){
                    res.status(404).send({
                        message: 'Channel Not Found',
                        data: []
                    })
                }
                else {
                    res.status(200).json({
                        message: "channel to success",
                        data: arr
                    })
                }
            console.log(arr);
            // res.send(userMap);  
        });
    });

    router.delete('/channels/playlist/song', isLoggedIn, (req, res) => {  

      const channel_id = req.query.channelId;
      const song_id    = req.query.songId;

      // the following query deletes a song form a playlist of a certain channel
      channel.update({_id: ObjectId(channel_id)},{$pull:{playList:{_id:ObjectId(song_id)}}})
        .exec()
        .then(result => {

          // for checking if document was found and deleted
          // mongodb actually returns special object `result`
          //   which has its own certain fields
          if (result.deletedCount != 0) {
            res.status(200).send({
              success: true,
              message: `Channel with id ${req.params.id} deleted`
            })
          }
          else {
            res.status(404).send({
                success: false,
              message: `Channel with id ${req.params.id} was not found`
            })
          }         

        })
        .catch(error => {
            // here we see if we had any problem with server or db itself
            console.log(error)
            res.status(500).send({
            success: false,
            message: "Something went wrong with DELETE /channels/:id"
          })
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
                    pusher.trigger(
                        'mychannel',
                        'modified', 
                            {
                              name: req.params.id,
                              data: channeldata
                            }
                    );

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
