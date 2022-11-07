const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../../app");
const { User } = require("../../models/user");
const request = require("supertest");

const { DB_TEST_HOST } = process.env;

describe("test auth routes", function () {
  let server;
  beforeAll(() => (server = app.listen(3000)));

  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.close(() => done());
  });

  test("test signUp", async () => {
    const newUser = {
      email: "testmail@gmail.com",
      password: "testPWD",
    };

    const responseSignUp = await request(app)
      .post("/api/users/signup")
      .send(newUser);
    /*
    відповідь повина мати статус-код 200
    у відповіді повинен повертатися токен
    у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
        */
    expect(responseSignUp.body.user.email).toBe(newUser.email);
    expect(responseSignUp.statusCode).toBe(201);

    const responseSignIn = await request(app)
      .post("/api/users/login")
      .send(newUser);

    expect(responseSignIn.statusCode).toBe(200);
    expect(typeof responseSignIn.body.user).toBe("object");
    expect(responseSignIn.body.user.email).toBe(newUser.email);

    const user = await User.findOne({ email: newUser.email });

    const { body } = responseSignIn;
    expect(body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
    expect(responseSignIn.body.user.subscription).toBe(user.subscription);
  });
});
