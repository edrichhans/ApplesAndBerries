var express = require('express');
var app = express();

app.get('/moreInformation', function(req, res){
  res.send({information: "Here's more"});
});
app.use(express.static(__dirname + "/public"));

module.exports = app;
