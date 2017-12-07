module.exports = function(router, passport) {

    // router.post('/register',
    //     passport.authenticate('spotify-signup'),
    //     function(req, res) {
    //         res.status(200).json({ user: req.user.email
    //     });
    // });

    router.get('/auth/spotify',
        passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: true}),
        function(req,res){     
    });


    
    // router.get('/login',
    //     passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private']}),
    //     function(req,res){     
    // });


    router.get('/auth/spotify/callback',
        passport.authenticate('spotify', { failureRedirect: '/login' }),
        function(req,res){
            res.redirect('/dashboard');
    });

    router.get('/profile',
        isLoggedIn,
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user, message: "Welcome!"
        });
    });

    // router.get('/logout', function(req, res) {
    //     req.logOut();
    //     res.status(200).json({ message: "logged out "});
    // });

    return router;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "unable to auth" });
}
