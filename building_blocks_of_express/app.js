var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

app.use(express.static(__dirname + '/public'));

var blocks = require('./routes/blocks');
app.use('/blocks', blocks);

app.listen(1234, function() {
  console.log("Listening on port 1234");
});
