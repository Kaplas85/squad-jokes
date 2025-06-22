import {
  createNewJoke,
  deleteSingleJoke,
  getJokesFromExternal,
  updateSingleJoke,
} from "@controllers/jokes";
import { getPairedJokesController } from "@controllers/pairedJokes";
import { Router } from "express";

const router = Router();

router.get("/", getJokesFromExternal);
router.post("/", createNewJoke);
router.put("/:id", updateSingleJoke);
router.delete("/:id", deleteSingleJoke);
router.get("/emparejados", getPairedJokesController);

export default router;
