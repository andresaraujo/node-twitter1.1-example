var express = require('express');
var app =  module.exports = express();
var http = require('http'); 
var path = require('path');
var passport = require('passport');

app.configure(function() {
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'i hate coffee' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);

    // Set environment
    app.set('port', process.env.PORT || 3000);
    app.set('hostname', 'localhost');
    app.set('TWITTER_CONSUMER_KEY', process.env.TWITTER_CONSUMER_KEY);
    app.set('TWITTER_CONSUMER_SECRET', process.env.TWITTER_CONSUMER_SECRET);
});

// Use compiled sources(dist) if in production env
if ('production' == app.get('env')) {
    app.use(express.static(path.join(__dirname, 'dist')));
} else {
    app.use(express.static(path.join(__dirname, 'app')));
    app.use(express.errorHandler());
}

// Bootstrap routes
require('./routes/twitter-proxy')(app, passport)
 
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});