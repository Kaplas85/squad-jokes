const { computeLCM, increment } = require("../services/math");

function getLCM(req, res) {
  try {
    const { numbers } = req.query;
    if (!numbers) {
      return res.status(422).json({ error: "Falta el parámetro 'numbers'" });
    }

    const nums = String(numbers)
      .split(",")
      .map((x) => {
        const v = parseInt(x, 10);
        if (isNaN(v)) throw new Error(`'${x}' no es un entero válido`);
        return v;
      });

    const result = computeLCM(nums);
    res.json({ lcm: result });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
}

function incrementNumber(req, res) {
  try {
    const { number } = req.query;
    if (number === undefined) {
      return res.status(422).json({ error: "Falta el parámetro 'number'" });
    }
    const n = parseInt(number, 10);
    if (isNaN(n)) {
      return res
        .status(422)
        .json({ error: `'${number}' no es un entero válido` });
    }

    const result = increment(n);
    res.json({ result });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
}

module.exports = {
  getLCM,
  incrementNumber,
};
