const createError = require('http-errors');
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const app = express();
/**
 * Configure Express Plugins
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/**
 * Add a middleware to remove unneccesary headers
 */
app.use(function(req,res,next){
  res.removeHeader('Transfer-Encoding');
  res.removeHeader('X-Powered-By');
  res.removeHeader('date');
  res.removeHeader('connection');
  next();
})
/**
 * Configure Routing
 */
app.use('/', indexRouter);


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
  res.json(err);
});

module.exports = app;
