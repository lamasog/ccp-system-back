require('dotenv').config();
require('./database');

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  app.use(cors());
  next();
});

// app.use(cors());

app.use(routes);

module.exports = app;