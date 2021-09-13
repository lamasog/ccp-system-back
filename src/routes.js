const express = require('express');
const routes = express.Router();

const AlunoController = require('../src/controllers/AlunoController');
const OrientadorController = require('../src/controllers/OrientadorController');
const CcpControler = require('../src/controllers/CcpControler');
const RelatorioController = require('../src/controllers/RelatorioController')

const Authentication = require('../src/middlewares/auth');

routes.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  return res.status(200).json('Rota inicial');
});

routes.post('/alunos/register', AlunoController.create);
routes.post('/alunos/login', AlunoController.login);
routes.get('/alunos/list', Authentication, AlunoController.read);
routes.put('/alunos/update', Authentication, AlunoController.update);
routes.delete('/alunos/delete', Authentication, AlunoController.delete);

routes.post('/orientadores/register', OrientadorController.create);
routes.post('/orientadores/login', OrientadorController.login);
routes.get('/orientadores/list', Authentication, OrientadorController.read);
routes.put('/orientadores/update', Authentication, OrientadorController.update);
routes.delete('/orientadores/delete', Authentication, OrientadorController.delete);

routes.post('/ccp/login', CcpControler.login);

routes.post('/relatorios/create', Authentication, RelatorioController.create);
routes.get('/relatorios/list', Authentication, RelatorioController.read);
routes.get('/relatorios/listAll', Authentication, RelatorioController.readAll);

module.exports = routes;