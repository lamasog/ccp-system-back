const Sequelize = require('sequelize');
const database = require('../config/database');

const Aluno = require('../models/Aluno');
const Orientador = require('../models/Orientador');
//const Ccp = require('../models/Ccp');
//const Form = require('../models/Form');
//const Parecer = require('../models/Parecer);

const connection = new Sequelize(database);

connection.authenticate().
  then(() => console.log('Connected to the database...'))
  .catch((error) => console.log(error));

Aluno.init(connection);
Orientador.init(connection);
//Ccp.init(connection);
//Form.init(connection);
//Parecer.init(connection);

Aluno.associate(connection.models);
Orientador.associate(connection.models);
//Ccp.associate(connection.models);
//Form.associate(connection.models);
//Parecer.init(connection);

module.exports = connection;