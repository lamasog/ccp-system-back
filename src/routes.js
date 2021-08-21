const express = require('express');
const routes = express.Router();

const AlunoController = require('../src/controllers/AlunoController');
const Authentication = require('../src/middlewares/auth');

routes.get('/', (req, res) => {
  return res.status(200).json('Rota inicial');
});

routes.post('/alunoslogin', AlunoController.login);

routes.post('/alunos', AlunoController.create);
routes.get('/alunos', AlunoController.read);
routes.put('/alunos/', Authentication, AlunoController.update);
routes.delete('/alunos', Authentication, AlunoController.delete);

module.exports = routes;