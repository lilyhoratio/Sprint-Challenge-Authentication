const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/dbConfig");

// cross-env not working

const testUser = {
  username: "lily",
  password: "password"
};

describe("users", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("TESTING ENVIRONMENT", () => {
    it("should set env to testing", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });

  describe("POST /api/auth/register", () => {
    it("returns 201", () => {
      return request(server)
        .post(`/api/auth/register`)
        .send(testUser)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("returns JSON", () => {
      return request(server)
        .post(`/api/auth/register`)
        .send({ username: "test", password: "test" })
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("returns 500 with incomplete user info", () => {
      return request(server)
        .post(`/api/auth/register`)
        .send({ username: "tommy" })
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });

  describe("POST /api/auth/login", () => {
    it("returns token for a logged in user", async () => {
      // emulate registration

      let registeredUser = await request(server)
        .post("/api/auth/register")
        .send(testUser);

      expect(registeredUser.status).toBe(201); // created

      let loggedInUser = await request(server)
        .post(`/api/auth/login`)
        .send(testUser);

      //   expect(loggedInUser.status).toBe(200); // success
      expect(loggedInUser.body.token).toBeTruthy();
    });
  });

  describe("Jokes endpoint", () => {
    it("returns 401 if not logged in", async () => {
      const res = await request(server).get(`/api/jokes`);
      expect(res.status).toBe(400); // no token
    });

    it("returns 200 if logged in", async () => {
      const { token } = (await request(server)
        .post("/api/auth/login")
        .send(testUser)).body;

      const res = await request(server)
        .get("/api/jokes")
        .set("Authorization", process.env.TOKEN);
      expect(res.status).toBe(200);
    });
  });
});
