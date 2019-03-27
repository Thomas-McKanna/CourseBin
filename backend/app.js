require('dotenv').config(); // Sets up dotenv as soon as our application starts

var express = require('express'); // web framework
var path = require('path'); // utilities for working with file and directory paths
var bodyParser = require('body-parser'); // parses incoming request bodies
var logger = require('morgan'); // logs requests to console

var db = require('./db') // allows easy access to database connection

var usersRouter = require('./routes/users');

var app = express();

const environment = process.env.NODE_ENV; // development
const stage = require('./config')[environment];

app.use('/users', usersRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost:${stage.port}`);
});

// Connect to MySQL on start

db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
    console.log('Connected to MySQL database.')
  }
})

module.exports = app;
