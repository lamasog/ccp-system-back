const express = require('express');
const routes = express.Router();

const AlunoController = require('../src/controllers/AlunoController');
const OrientadorController = require('../src/controllers/OrientadorController');
const Authentication = require('../src/middlewares/auth');

routes.get('/', (req, res) => {
  return res.status(200).json('Rota inicial');
});

routes.post('/alunos/cadastro', AlunoController.create);
routes.post('/alunos/login', AlunoController.login);
routes.get('/alunos/list', AlunoController.read);
routes.put('/alunos/update', Authentication, AlunoController.update);
routes.delete('/alunos/delete', Authentication, AlunoController.delete);

routes.post('/orientadores/cadastro', OrientadorController.create);
routes.post('/orientadores/login', OrientadorController.login);
routes.get('/orientadores/list', OrientadorController.read);
routes.put('/orientadores/update', Authentication, OrientadorController.update);
routes.delete('/orientadores/delete', Authentication, OrientadorController.delete);

module.exports = routes;