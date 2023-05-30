var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http_errors=require("http-errors")
// var redis=require('redis')
// var connectRedis=require('connect-redis')
var session=require('express-session')




//db connection
var db=require('./db/connection')

// console.log(db)

// setting an event listener to know weather the connection with mongdb is successfull or not
db.once('open',()=>{
  console.log('db connected successfully')
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// const RedisStore=connectRedis.
// //configure our redis

// const redisClient=redis.createClient({
//   port:6379,
//   host:'localhost'
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//middleweares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({name:'user', secret: "Private", resave: false, saveUninitialized: false, cookie: { maxAge: 60000000 } }))

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
