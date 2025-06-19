const { getPairedJokes } = require("../services/pairedJokes");

async function getPairedJokesController(req, res) {
  try {
    const result = await getPairedJokes();
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
}

module.exports = { getPairedJokesController };
