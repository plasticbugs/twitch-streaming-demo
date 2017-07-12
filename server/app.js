const express = require('express');
const app = express();
const router = require('../server/routes/main');
const path = require('path');

app.use('/', router);
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;