const mongoose = require("mongoose");

const request = require("supertest");

const { app } = require("../app");

const { MONGO_URL } = process.env;

const ENDPOINT = "/users/login";
const FORTESTUSER = {
  email: "vlada@gmail.com",
  password: "qwe@Dd3123",
};

describe("test login controller", () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URL);
  });
  afterAll(async () => {
    await mongoose.disconnect(MONGO_URL);
  });

  test("return status code 200", async () => {
    const response = await request(app).post(ENDPOINT).send(FORTESTUSER);
    expect(response.status).toBe(200);
  });
  test("return token", async () => {
    const response = await request(app).post(ENDPOINT).send(FORTESTUSER);
    expect(response.body.user.token).toBeDefined();
  });
  test("email and subscription with typeof string", async () => {
    const response = await request(app).post(ENDPOINT).send(FORTESTUSER);

    expect(response).toBeDefined();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
});
