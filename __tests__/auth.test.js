const app = require('../src/app');
const request = require("supertest");


let token;

beforeAll((done) => {
    request(app).post("/alunos/register").send({
      codigo: "123123",
      name: "Geovana",
      surname: "Lamas",
      email: "geovana@test.com",
      password: "123",
      cod_orientador: "",
      curso: "mestrado"
    })
    .end((err, response) => {
      token = response.body.token; 
      done();
    });
});

describe('GET /', () => {

    test('It should require authorization', () => {
        return request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(401);
        });
    });

    test('It responds with JSON', () => {
        return request(app).get('/')
        .set('Authorization', `Bearer ${token}`).then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
        });
    });
});
  