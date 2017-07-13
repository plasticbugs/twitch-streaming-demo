const express = require('express');
const router = require('../server/routes/main');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('../middleware/passport');
const session = require('express-session');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true,
  name: 'chatbox'
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;