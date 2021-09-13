const Sequelize = require('sequelize');
const config = require('../config/database');

const Aluno = require('../models/Aluno');
const Orientador = require('../models/Orientador');
const Ccp = require('../models/Ccp');
const Relatorio = require('../models/Relatorio');

const connection = new Sequelize(config);
const database = {};

connection.authenticate().
  then(() => console.log('Connected to the database...'))
  .catch((error) => console.log(error));

Aluno.init(connection);
Orientador.init(connection);
Ccp.init(connection);
Relatorio.init(connection);

Aluno.associate(connection.models);
Orientador.associate(connection.models);
Relatorio.associate(connection.models);

database.sequelize = connection;
database.Sequelize = Sequelize;

module.exports = database;