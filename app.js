const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const indexRouter = require('./routes/index');
const gameRouter = require('./routes/game');
const createGame = require('./routes/createGame');
const startGame = require('./routes/startGame');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use('/', indexRouter);
app.use('/game/', gameRouter);
app.use('/createGame', createGame);
app.use('/startGame', startGame);



app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

/**
 * Conecta con el servidor Node y con la base de datos de MongoDB
 */

mongoose.connect("mongodb://localhost/diceGames", (err, res) => {
  if (err) {
    console.log("Error: connecting to database. " + err);
  }
  console.log("Node server running on http://localhost:3000")

});

module.exports = app;
