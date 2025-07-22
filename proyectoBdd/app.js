var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDb = require('./config/database.js'); // coneccion base de datos 
const crearReserva = require('./pruebas.js'); // para probar la base de datos y modelos


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const habitacionRouter = require('./routes/API/habitacion.routes.js');
const huespedesRouter = require('./routes/API/huesped.routes.js');
const reservasRouter = require('./routes/API/reserva.routes.js');
const reportesRouter = require('./routes/API/reportes.routes.js');

var app = express();
connectDb(); //ejecuta la coneccion a la base de datos

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/API/habitaciones', habitacionRouter);
app.use('/API/huespedes', huespedesRouter);
app.use('/API/reservas', reservasRouter);

// Aquí agregamos las rutas nuevas
app.use('/API/reportes', reportesRouter);


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