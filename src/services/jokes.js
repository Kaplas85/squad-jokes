const db = require("./../db");
const { jokesTable } = require("./../db/schema");
const axios = require("axios");
const { eq } = require("drizzle-orm");

async function fetchJoke(type) {
  if (!type) {
    type = Math.random() < 0.5 ? "chuck" : "dad";
  }

  if (type.toLowerCase() === "chuck") {
    const { data } = await axios.get("https://api.chucknorris.io/jokes/random");
    return {
      joke: data.value,
      from: "chuck",
    };
  }

  if (type.toLowerCase() === "dad") {
    const { data } = await axios.get("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    return {
      joke: data.joke,
      from: "dad",
    };
  }

  const err = new Error("Tipo de chiste no soportado");
  throw err;
}

async function saveJoke(text) {
  return await db.insert(jokesTable).values({ text }).returning();
}

async function updateJoke(id, text) {
  return await db
    .update(jokesTable)
    .set({ text })
    .where(eq(jokesTable.id, id))
    .returning();
}

async function deleteJoke(id) {
  return await db.delete(jokesTable).where(eq(jokesTable.id, id)).returning();
}

module.exports = {
  fetchJoke,
  saveJoke,
  updateJoke,
  deleteJoke,
};
