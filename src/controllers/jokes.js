const {
  fetchJoke,
  saveJoke,
  updateJoke,
  deleteJoke,
} = require("../services/jokes");

const getJokesFromExternal = async (req, res) => {
  try {
    const { source } = req.query;
    const joke = await fetchJoke(source);
    res.status(200).json(joke);
  } catch (error) {
    res.status(422).json({ error: "Error fetching joke" });
  }
};

const createNewJoke = async (req, res) => {
  try {
    const { joke } = req.body;
    if (!joke) {
      return res.status(422).json({ error: "Joke text is required" });
    }
    const result = await saveJoke(joke);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error saving joke:", error);
    res.status(422).json({ error: error.message });
  }
};

const updateSingleJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const { joke } = req.body;

    if (!joke) {
      return res.status(422).json({ error: "Joke text is required" });
    }
    const result = await updateJoke(id, joke);

    if (result.length === 0) {
      return res.status(404).json({ error: "Joke not found" });
    }

    res.status(200).json({ message: "Joke updated successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteSingleJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteJoke(id);

    if (result.length === 0) {
      return res.status(404).json({ error: "Joke not found" });
    }

    res.status(204).json();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getJokesFromExternal,
  createNewJoke,
  updateSingleJoke,
  deleteSingleJoke,
};
