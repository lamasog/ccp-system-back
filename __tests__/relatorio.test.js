const app = require('../src/app');
const database = require("../src/database");
const request = require("supertest");

describe("Testing routes for Relatorios", () => {

  // it("should insert a new Relatorio into the database", async () => {
  //   const response = await request(app).post("/relatorios/create").send({
  //     cod_aluno: "123123",
  //   });

  //   expect(response.status).toBe(200);
  // });

  afterAll(async () => {
    await database.sequelize.close()
  })
});