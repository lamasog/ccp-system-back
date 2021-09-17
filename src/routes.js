const express = require('express');
const routes = express.Router();

const AlunoController = require('../src/controllers/AlunoController');
const OrientadorController = require('../src/controllers/OrientadorController');
const CcpControler = require('../src/controllers/CcpControler');
const RelatorioController = require('../src/controllers/RelatorioController')

const Authentication = require('../src/middlewares/auth');

routes.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json('Rota inicial');
});

// Cadastra aluno
routes.post('/alunos/register', AlunoController.create);
// Login do aluno
routes.post('/alunos/login', AlunoController.login);
// Orientador lista alunos associados
routes.get('/alunos/orientadores/list', Authentication, AlunoController.readOrientador);
// CCP lista todos os alunos cadastrados
routes.get('/alunos/ccp/list', Authentication, AlunoController.readCcp);
// Atualiza nome, sobrenome, email ou senha
routes.put('/alunos/update', Authentication, AlunoController.update);
// CCP deleta aluno específico
routes.delete('/alunos/ccp/delete', Authentication, AlunoController.delete);

// Cadastra orientador
routes.post('/orientadores/register', OrientadorController.create);
// Login do orientador
routes.post('/orientadores/login', OrientadorController.login);
// CCP lista todos os orientadores cadastrados
routes.get('/orientadores/ccp/list', Authentication, OrientadorController.read);
// Atualiza nome, sobrenome, email e senha do orientador
routes.put('/orientadores/update', Authentication, OrientadorController.update);
// CCP deleta orientador específico
routes.delete('/orientadores/ccp/delete', Authentication, OrientadorController.delete);

// Login da CCP
routes.post('/ccp/login', CcpControler.login);

// CCP envia relatório para aluno específico
routes.post('/relatorios/ccp/create', Authentication, RelatorioController.create);
// CCP lê relatório de aluno específico
routes.post('/relatorios/ccp/read', Authentication, RelatorioController.readCcp);
// CCP lista todos os relatórios enviados
routes.get('/relatorios/ccp/list', Authentication, RelatorioController.listCcp);
// CCP escreve o parecer no relatório específico
routes.post('/relatorios/ccp/feedback', Authentication, RelatorioController.feedbackCcp);
// CCP deleta relatório específico
routes.delete('/relatorios/ccp/delete', Authentication, RelatorioController.delete);

// Orientador lê relatório de aluno específico
routes.post('/relatorios/orientadores/read', Authentication, RelatorioController.readOrientador);
// Orientador escreve parecer no relatório específico
routes.post('/relatorios/orientadores/feedback', Authentication, RelatorioController.feedbackOrientador);

// Aluno lê o relatório
routes.get('/relatorios/alunos/read', Authentication, RelatorioController.readAluno);
// Aluno responde o relatório
routes.post('/relatorios/alunos/form', Authentication, RelatorioController.answerAluno);

module.exports = routes;