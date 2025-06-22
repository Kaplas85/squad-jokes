import db from "@/db";
import { jokesTable } from "@/db/schema";
import app from "@/server";
import request from "supertest";

beforeAll(async () => {
  await db.delete(jokesTable);
});

describe("Jokes API", () => {
  test("GET Random Joke", async () => {
    const res = await request(app).get("/jokes");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("joke");
    expect(res.body).toHaveProperty("from");
  });

  test("GET Chuck Joke", async () => {
    const res = await request(app).get("/jokes?source=Chuck");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("joke");
    expect(res.body).toHaveProperty("from");
    expect(res.body.from).toBe("chuck");
  });

  test("GET Dad Joke", async () => {
    const res = await request(app).get("/jokes?source=Dad");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("joke");
    expect(res.body).toHaveProperty("from");
    expect(res.body.from).toBe("dad");
  });

  test("GET Random Joke with invalid source", async () => {
    const res = await request(app).get("/jokes?source=Invalid");
    expect(res.statusCode).toBe(422);
  });

  test("Save new joke", async () => {
    const res = await request(app).post("/jokes").send({
      joke: "Why did the chicken cross the road? To get to the other side!",
    });
    expect(res.statusCode).toBe(201);
  });

  test("Update joke", async () => {
    const item = await db
      .insert(jokesTable)
      .values({
        text: "Initial joke text",
      })
      .returning();

    const res = await request(app).put(`/jokes/${item[0].id}`).send({
      joke: "Updated joke text",
    });

    expect(res.statusCode).toBe(200);
  });

  test("Update non-existing joke", async () => {
    const res = await request(app).put("/jokes/999").send({
      joke: "This joke does not exist",
    });
    expect(res.statusCode).toBe(404);
  });

  test("Delete Joke", async () => {
    const item = await db
      .insert(jokesTable)
      .values({
        text: "Delete joke text",
      })
      .returning();

    const res = await request(app).delete(`/jokes/${item[0].id}`);
    expect(res.statusCode).toBe(204);
  });

  test("Delete non-existing Joke", async () => {
    const res = await request(app).delete("/jokes/999");
    expect(res.statusCode).toBe(404);
  });

  test("Get Combined Jokes", async () => {
    const res = await request(app).get("/jokes/emparejados");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const itemSample = res.body[0];
    expect(itemSample).toHaveProperty("chuck");
    expect(itemSample).toHaveProperty("dad");
    expect(itemSample).toHaveProperty("combinado");
  });
});
