import axios from "axios";

async function fetchChuckJokes(n: number = 5) {
  const requests = Array.from({ length: n }, () =>
    axios
      .get("https://api.chucknorris.io/jokes/random")
      .then((res) => res.data.value)
  );
  return Promise.all(requests);
}

async function fetchDadJokes(n = 5) {
  const requests = Array.from({ length: n }, () =>
    axios
      .get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      })
      .then((res) => res.data.joke)
  );
  return Promise.all(requests);
}

function pairJokes(chuckJokes: string[], dadJokes: string[]) {
  const minLen = Math.min(chuckJokes.length, dadJokes.length);
  const pairs = [];
  for (let i = 0; i < minLen; i++) {
    pairs.push({
      chuck: chuckJokes[i],
      dad: dadJokes[i],
      combinado: `${chuckJokes[i]} Also, ${dadJokes[i]}`,
    });
  }
  return pairs;
}

async function getPairedJokes() {
  try {
    console.log("Fetching Chuck Norris and Dad jokes in parallel...");
    const [chuckJokes, dadJokes] = await Promise.all([
      fetchChuckJokes(5),
      fetchDadJokes(5),
    ]);
    console.log("Fetched jokes. Pairing...");
    return pairJokes(chuckJokes, dadJokes);
  } catch (err: any) {
    console.error("Error fetching paired jokes:", err.message);
    throw new Error("Failed to fetch paired jokes");
  }
}

export { getPairedJokes };
