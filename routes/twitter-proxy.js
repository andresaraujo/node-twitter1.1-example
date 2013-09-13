var TwitterStrategy = require('passport-twitter').Strategy;
var ntwitter = require('ntwitter');



module.exports = function (app, passport) {
	passport.use(new TwitterStrategy({
	    consumerKey:    app.get('TWITTER_CONSUMER_KEY'),
	    consumerSecret: app.get('TWITTER_CONSUMER_SECRET'),
	    callbackURL:    '/auth/twitter/callback'
	    },
	    function(token, tokenSecret, profile, done) {
	    	var loggedUsr={};
	        loggedUsr.token=token;
	        loggedUsr.tokenSecret=tokenSecret;
	        loggedUsr.user=profile;
	        done(null, loggedUsr);
	    }
	));

	passport.serializeUser(function(user, done) {
	    done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	    done(null, user);
	});

  	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback',
	    passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));

	app.get('/api/search', function (req, res) {
		if(req.user){
	        var twit = new ntwitter({
	            consumer_key: app.get('TWITTER_CONSUMER_KEY'),
	            consumer_secret: app.get('TWITTER_CONSUMER_SECRET'),
	            access_token_key: req.user.token,
	            access_token_secret: req.user.tokenSecret
	        });

	       twit.verifyCredentials(function (err, data) {
	            console.log("Verifying Credentials...");
	            if(err){
	              console.log("Verification failed : " + err)
	              res.send("Something went wrong :(");
	            }
	        }).search('#node', {count:3}, function(err, data) {
	            if(err){
	                console.log("Verification failed : " + err)
	                res.send("Something went wrong :(");
	            }else{
	                var result=[];
	                for (var index in data.statuses) {
	                    var i=data.statuses[index];
	                    var twitItem={};
	                    twitItem.id=i.id;
	                    twitItem.text=i.text;
	                    twitItem.screen_name=i.user.screen_name;
	                    result.push(twitItem);
	                }
	                res.send(result);
	            }
	        });
	    } else {
	        res.send('<a href="/auth/twitter">Sign in with Twitter</a>');
	    }
	});

}
