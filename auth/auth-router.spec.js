const server = require("../api/server.js");
const request = require("supertest");

describe("auth-router.js", () => {
  describe("GET /api/auth/register", () => {
    it("returns 200 OK", () => {
      return request(server)
        .get(`/api/auth/register`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
