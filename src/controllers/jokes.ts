import { deleteJoke, fetchJoke, saveJoke, updateJoke } from "@services/jokes";
import { Request, Response } from "express";

const getJokesFromExternal = async (req: Request, res: Response) => {
  try {
    const { source } = req.query as { source?: "chuck" | "dad" };
    const joke = await fetchJoke(source);
    res.status(200).json(joke);
  } catch (error) {
    res.status(422).json({ error: "Error fetching joke" });
  }
};

const createNewJoke = async (req: Request, res: Response) => {
  try {
    const { joke } = req.body;
    if (!joke) {
      res.status(422).json({ error: "Joke text is required" });
      return;
    }
    const result = await saveJoke(joke);
    res.status(201).json(result);
  } catch (error: any) {
    console.error("Error saving joke:", error);
    res.status(422).json({ error: error.message });
  }
};

const updateSingleJoke = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { joke } = req.body as { joke: string };

    if (!joke) {
      res.status(422).json({ error: "Joke text is required" });
      return;
    }
    const result = await updateJoke(Number(id), joke);

    if (result.length === 0) {
      res.status(404).json({ error: "Joke not found" });
      return;
    }

    res.status(200).json({ message: "Joke updated successfully" });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const deleteSingleJoke = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const result = await deleteJoke(Number(id));

    if (result.length === 0) {
      res.status(404).json({ error: "Joke not found" });
      return;
    }

    res.status(204).json();
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export {
  createNewJoke,
  deleteSingleJoke,
  getJokesFromExternal,
  updateSingleJoke,
};
