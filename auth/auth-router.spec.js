const server = require("../api/server.js");
const request = require("supertest");

describe("auth-router.js", () => {
  // cross-env not working
  //   describe("TESTING ENVIRONMENT", () => {
  //     it("should set env to testing", () => {
  //       expect(process.env.DB_ENV).toBe("testing");
  //     });
  //   });
  describe("GET /api/auth/register", () => {
    it("returns 200 OK", () => {
      return request(server)
        .get(`/api/auth/register`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("returns JSON", () => {
      return request(server)
        .get(`/api/auth/register`)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});
