var fs = require('fs');
var express = require('express')
  , app = express.createServer();
app.configure(function() {
  var hourMs = 1000*60*60;
  app.use(express.static(__dirname + '/', { maxAge: hourMs }));
  app.use(express.directory(__dirname + '/'));
  app.use(express.errorHandler());
});
app.listen(8095);
