const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_TEST_HOST } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login route", async () => {
    const hashPassword = await bcrypt.hash("123456", 10);
    const newUser = {
      email: "test@gmail.com",
      password: hashPassword,
    };

    const user = await User.create(newUser);

    /*
    відповідь повина мати статус-код 200
    у відповіді повинен повертатися токен
    у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
        */
    const loginUser = {
      email: "test@gmail.com",
      password: "123456",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    console.log(response);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
    // expect(response.user).objectContaining({
    //   email: expect.any(String),
    //   subscription: expect.any(String),
    // });
  });
});
