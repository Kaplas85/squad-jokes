const request = require("supertest");
const app = require("../src/server");
const { login } = require("../src/services/auth");

describe("Auth Tests", () => {
  test("Login with valid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "user@example.com", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("Login with invalid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "user@example.com", password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "invalid password");
  });

  test("login without credentials", async () => {
    const res = await request(app).post("/auth/login").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "email and password required");
  });

  test("Access protected route as user", async () => {
    const token = login("user@example.com", "password123").token; // Assuming login returns a token for valid credentials
    const res = await request(app)
      .get("/api/usuario")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  test("Access protected route as admin", async () => {
    const token = login("admin@example.com", "password123").token; // Assuming login returns a token for valid credentials
    const res = await request(app)
      .get("/api/admin")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  test("Access protected route without token", async () => {
    const res = await request(app).get("/api/usuario");

    expect(res.statusCode).toBe(401);
  });

  test("Access protected route with invalid token", async () => {
    const res = await request(app)
      .get("/api/usuario")
      .set("Authorization", `Bearer invalidtoken`);
    expect(res.statusCode).toBe(401);
  });

  test("Access admin route as user", async () => {
    const token = login("user@example.com", "password123").token;
    const res = await request(app)
      .get("/api/admin")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
  });
});
