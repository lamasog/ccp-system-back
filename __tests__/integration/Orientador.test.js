const request = require('supertest');
const controller = require('../../src/controllers/OrientadorController');

describe("Teste de Orientador", () => {
    it('Deve criar um usuario orientador', async () => {
        const response = await request(controller)
        .post('/create')
        .send({
        codigo: "001",
        name: "Marta",
        surname: "Silva",
        email: "marta123@gmail.com",
        password: "1234"
        });

        expect(response.status).toBe(200);
        expect(response.name).toBe("Marta");
    });
});