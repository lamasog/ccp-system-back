const app = require('../src/app');
const database = require("../src/database");
const request = require("supertest");

describe("Testing routes for alunos", () => {

  it("should insert a new Aluno into the database", async () => {
    const response = await request(app).post("/alunos/register").send({
      codigo: "123123",
      name: "Geovana",
      surname: "Lamas",
      email: "geovana@test.com",
      password: "123"
    });

    expect(response.status).toBe(200);
  });

  it("should fail to insert a new Aluno into the database", async () => {
    const response = await request(app).post("/alunos/register").send({
      codigo: "",
      name: "",
      surname: "",
      email: "",
      password: ""
    });

    expect(response.status).toBe(400);
  });

  it("should login Aluno", async () => {
    const response = await request(app).post("/alunos/login").send({
      codigo: "123123",
      password: "123"
    });

    expect(response.status).toBe(200);
  });

  it("should fail to login Aluno", async () => {
    const response = await request(app).post("/alunos/login").send({
      codigo: "123321",
      password: "123"
    });

    expect(response.status).toBe(404);
  });

  it("should fail to read Alunos from the database", async () => {
    const response = await request(app).get("/alunos/list");

    // Unauthorized
    expect(response.status).toBe(401);
  });

  afterAll(async () => {
    await database.sequelize.close()
  })
});