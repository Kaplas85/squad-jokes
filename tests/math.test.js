const request = require("supertest");
const app = require("../src/server");

describe("Math API", () => {
  test("Calc LCM", async () => {
    const res = await request(app).get("/math/lcm?numbers=2,3,5");
    expect(res.status).toBe(200);
    expect(res.body.lcm).toBe(30);
  });

  test("Try calc LCM with invalid numbers", async () => {
    const res = await request(app).get("/math/lcm?numbers=2,3,invalid");
    expect(res.status).toBe(422);
  });

  test("Increment integer number", async () => {
    const res = await request(app).get("/math/increment?number=41");
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(42);
  });

  test("Try increment invalid number", async () => {
    const res = await request(app).get("/math/increment?number=Invalid");
    expect(res.status).toBe(422);
  });
});
