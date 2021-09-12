const request = require('supertest');
const controller = require('../../src/controllers/AlunoController');

describe("Teste de Aluno", () => {
    it('Deve criar um usuario aluno', async () => {
        const response = await request(controller)
        .post('/create')
        .send({
        codigo: "001",
        name: "Joana",
        surname: "Lima",
        email: "JL12@gmail.com",
        password: "senha"
        });

        expect(response.status).toBe(200);
        expect(response.name).toBe("Joana");
    });
});