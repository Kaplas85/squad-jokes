import db from "@/db";
import { jokesTable } from "@/db/schema";
import axios from "axios";
import { eq } from "drizzle-orm";

async function fetchJoke(type?: "chuck" | "dad") {
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

async function saveJoke(text: string) {
  return await db.insert(jokesTable).values({ text }).returning();
}

async function updateJoke(id: number, text: string) {
  return await db
    .update(jokesTable)
    .set({ text })
    .where(eq(jokesTable.id, id))
    .returning();
}

async function deleteJoke(id: number) {
  return await db.delete(jokesTable).where(eq(jokesTable.id, id)).returning();
}

export { deleteJoke, fetchJoke, saveJoke, updateJoke };
