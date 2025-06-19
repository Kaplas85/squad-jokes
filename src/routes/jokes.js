const router = require("express").Router();
const {
  getJokesFromExternal,
  createNewJoke,
  updateSingleJoke,
  deleteSingleJoke,
} = require("../controllers/jokes");

router.get("/", getJokesFromExternal);
router.post("/", createNewJoke);
router.put("/:id", updateSingleJoke);
router.delete("/:id", deleteSingleJoke);

module.exports = router;
