var express = require('express');
var app = express();
var request = require('request');
var url = require('url');

app.get('tweets/:username', function (req, res) {
  var username = req.params.username;
  options = {
    protocol: "http:",
    host: 'api.twitter.com',
    pathname: '/1/statuses/user_timeline.json',
    query: { screen_name: username, count: 10 }
  };

  var twitterUrl = url.format(options);
  request(twitterUrl, function (err, _res, body) {
    var tweets = JSON.parse(body);
    res.locals = {tweets: tweets, name: username};
    res.render('tweets.ejs');
  });
});
