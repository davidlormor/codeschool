var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var logger = require('./logger');
app.use(logger);

app.use(express.static(__dirname + '/public'));

var blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};

app.param('name', function (req, res, next) {
  var name = req.params.name;
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

  req.blockName = block;

  next();
});

app.route('/blocks')
  .get(function (req, res) {
    res.json(Object.keys(blocks));
  })
  .post(parseUrlencoded, function (req, res) {
    var newBlock = req.body;
    blocks[newBlock.name] = newBlock.description;

    res.status(201).json(newBlock.name);
  });

app.route('/blocks/:name')
  .get(function (req, res) {
    var description = blocks[req.blockName];

    if(!description) {
      res.status(404).json('No description found for ' + req.params.name);
    } else {
      res.json(description);
    }
  })
  .delete(function (req, res) {
    delete blocks[req.blockName];
    res.sendStatus(200);
  });

app.listen(1234, function() {
  console.log("Listening on port 1234");
});
