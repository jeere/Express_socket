var path = require('path');
var logger = require('morgan');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Import routes
var json = require('./routes/json');
var index = require('./routes/index');
var post = require('./routes/post');

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Set the routes and use as imported
app.use('/', index);
app.use('/json', json);
app.use('/post', post);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;