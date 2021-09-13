require('dotenv').config();
require('./database');

const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.use(routes);
app.use(express.json());
app.use(cors());

module.exports = app;