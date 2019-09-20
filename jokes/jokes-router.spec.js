const server = require("../api/server.js");
const request = require("supertest");

describe("auth-router.js", () => {
  describe("GET /api/jokes", () => {
    it("returns 200 OK", () => {
      return request(server)
        .get(`/api/jokes`)
        .set("Authorization", process.env.TOKEN)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("returns JSON", () => {
      return request(server)
        .get(`/api/jokes`)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});
