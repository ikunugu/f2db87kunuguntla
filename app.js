var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();
const connectionString =
  process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
var indexRouter = require('./routes/index');

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});

var Flight = require("./models/flight");

var usersRouter = require('./routes/users');
var flightsRouter = require('./routes/flights');
var gridbuildRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');


var app = express();

// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything
  await Flight.deleteMany();
  let instance1 = new
    Flight({
      flightName: "KLM-Dutch", flightType: "International",
      price: 2500
    });
  let instance2 = new
    Flight({
      flightName: "Vistara", flightType: "Domestic",
      price: 2200
    });
    let instance3 = new
    Flight({
      flightName: "Air-India", flightType: "International",
      price: 2300
    });
instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved")
});
instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved")
});
instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved")
});
}
let reseed = true;
if (reseed) { recreateDB(); }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/flights', flightsRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/selector', selectorRouter);

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());

app.use('/resource', resourceRouter);

// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
