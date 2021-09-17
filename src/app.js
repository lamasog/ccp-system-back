require('dotenv').config();
require('./database');

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  app.use(cors());
  next();
});

// app.use(cors());

app.use(express.json());
app.use(routes);

module.exports = app;