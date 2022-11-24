var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let session = require('express-session');

let flash = require('connect-flash');
let passport = require('passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ticketsRouter = require('./routes/tickets')

var app = express();

//added session here
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: "sessionSecret"
}));


// Sets up passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));


//for db
const mongoose = require('mongoose');

//databasekey
const db = require('./config/databasekey').MongoURI;

//connection to atlas using mongoose for simplicity using documentation 
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo Atlas Connected"))
  .catch(err => console.log(err));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tickets', ticketsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
