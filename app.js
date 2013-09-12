var express = require('express'),
    app = express(),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    ntwitter = require('ntwitter');

app.configure(function() {
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'i hate coffee' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    
    app.set('hostname', 'localhost');
    app.set('port', 4000);
    app.set('TWITTER_CONSUMER_KEY', 'Rduxy5vhHYLVfYRVOAfSeg');
    app.set('TWITTER_CONSUMER_SECRET', 'KWWUSiiGewSm2Glci9KRkVdFxvrDGB41SXpGbZURzk');
});
var loggedUsr={};

passport.use(new TwitterStrategy({
    consumerKey:    app.get('TWITTER_CONSUMER_KEY'),
    consumerSecret: app.get('TWITTER_CONSUMER_SECRET'),
    callbackURL:    'http://' + app.get('hostname') + ':' + app.get('port') + '/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
        loggedUsr.token=token;
        loggedUsr.tokenSecret=tokenSecret;
        loggedUsr.user=profile;
        done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.get('/', function(req, res){
    if(req.user){
        var twit = new ntwitter({
            consumer_key: app.get('TWITTER_CONSUMER_KEY'),
            consumer_secret: app.get('TWITTER_CONSUMER_SECRET'),
            access_token_key: loggedUsr.token,
            access_token_secret: loggedUsr.tokenSecret
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

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/main', failureRedirect: '/login' }));

//todo: add heroku conf
console.log('App running, head to http://' + app.get('hostname') + ':' + app.get('port') 
    + ' to sign in with Twitter');
app.listen(app.get('port'));