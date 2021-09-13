const express = require('express');
const routes = express.Router();

const AlunoController = require('../src/controllers/AlunoController');
const OrientadorController = require('../src/controllers/OrientadorController');
const Authentication = require('../src/middlewares/auth');
const CcpControler = require('./controllers/CcpControler');

routes.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  return res.status(200).json('Rota inicial');
});

routes.post('/alunos/register', AlunoController.create);
routes.post('/alunos/login', AlunoController.login);
routes.get('/alunos/list', AlunoController.read);
routes.put('/alunos/update', Authentication, AlunoController.update);
routes.delete('/alunos/delete', Authentication, AlunoController.delete);

routes.post('/orientadores/register', OrientadorController.create);
routes.post('/orientadores/login', OrientadorController.login);
routes.get('/orientadores/list', OrientadorController.read);
routes.put('/orientadores/update', Authentication, OrientadorController.update);
routes.delete('/orientadores/delete', Authentication, OrientadorController.delete);

routes.post('/ccp/login', CcpControler.login);

module.exports = routes;