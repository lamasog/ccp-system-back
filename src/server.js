const express = require('express');
const routes = require('./routes');
const cors = require('cors');

require('./database');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});