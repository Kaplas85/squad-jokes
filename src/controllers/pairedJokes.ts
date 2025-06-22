import { getPairedJokes } from "@services/pairedJokes";
import type { Request, Response } from "express";

async function getPairedJokesController(req: Request, res: Response) {
  try {
    const result = await getPairedJokes();
    res.json(result);
  } catch (err: any) {
    res.status(422).json({ error: err.message });
  }
}

export { getPairedJokesController };
