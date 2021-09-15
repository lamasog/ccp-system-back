const app = require('../src/app');
const database = require("../src/database");
const request = require("supertest");

describe("Testing routes for orientadores", () => {

  it("should insert a new Orientador into the database", async () => {
    const response = await request(app).post("/orientadores/register").send({
      codigo: "112233",
      name: "David",
      surname: "Ono",
      email: "david@test.com",
      password: "123",
    });

    expect(response.status).toBe(200);
  });

  it("should fail to insert a new Orientador into the database", async () => {
    const response = await request(app).post("/orientadores/register").send({
      codigo: "",
      name: "",
      surname: "",
      email: "",
      password: ""
    });

    expect(response.status).toBe(400);
  });

  it("should login Orientador", async () => {
    const response = await request(app).post("/orientadores/login").send({
      codigo: "112233",
      password: "123"
    });

    expect(response.status).toBe(200);
  });

  it("should fail to login Orientador", async () => {
    const response = await request(app).post("/orientadores/login").send({
      codigo: "112233",
      password: "111"
    });

    expect(response.status).toBe(404);
  });

  it("should fail to read Orientadores from the database", async () => {
    const response = await request(app).get("/orientadores/list");

    // Unauthorized
    expect(response.status).toBe(401);
  });

  afterAll(async () => {
    await database.sequelize.close()
  })
});