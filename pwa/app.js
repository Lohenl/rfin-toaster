var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var staticRoot = __dirname + '/dist/toasterbank/';
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist')));
//app.use('/users', usersRouter);

app.use(function(req, res, next) {
  //if the request is not html then move along
  var accept = req.accepts('html', 'json', 'xml');
  if (accept !== 'html') {
      return next();
  }

  // if the request has a '.' assume that it's for a file, move along
  var ext = path.extname(req.path);
  if (ext !== '') {
      return next();
  }

  fs.createReadStream(staticRoot + 'index.html').pipe(res);

});

app.use(express.static(staticRoot));

module.exports = app;
