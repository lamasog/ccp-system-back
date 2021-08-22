const express = require('express');
const routes = express.Router();

const AlunoController = require('../src/controllers/AlunoController');
const OrientadorController = require('../src/controllers/OrientadorController');
const Authentication = require('../src/middlewares/auth');

routes.get('/', (req, res) => {
  return res.status(200).json('Rota inicial');
});

routes.post('/alunos', AlunoController.create);
routes.get('/alunos', AlunoController.read);
routes.put('/alunos', Authentication, AlunoController.update);
routes.delete('/alunos', Authentication, AlunoController.delete);
routes.post('/alunos/login', AlunoController.login);

routes.post('/orientadores', OrientadorController.create);
routes.get('/orientadores', OrientadorController.read);
routes.put('/orientadores', Authentication, OrientadorController.update);
routes.delete('/orientadores', Authentication, OrientadorController.delete);
routes.post('/orientadores/login', OrientadorController.login);

module.exports = routes;