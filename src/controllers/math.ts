import { computeLCM, increment } from "@services/math";
import { Request, Response } from "express";

function getLCM(req: Request, res: Response) {
  try {
    const { numbers } = req.query;
    if (!numbers) {
      res.status(422).json({ error: "'numbers' params missing" });
      return;
    }

    const nums = String(numbers)
      .split(",")
      .map((x) => {
        const v = parseInt(x, 10);
        if (isNaN(v)) throw new Error(`'${x}' is not a valid integer`);
        return v;
      });

    const result = computeLCM(nums);
    res.json({ lcm: result });
  } catch (err: any) {
    res.status(422).json({ error: err.message });
  }
}

function incrementNumber(req: Request, res: Response) {
  try {
    const { number } = req.query;
    if (number === undefined) {
      res.status(422).json({ error: "'numbers' params missing" });
      return;
    }
    const n = parseInt(number as string, 10);
    if (isNaN(n)) {
      res.status(422).json({ error: `'${number}' is not a valid integer` });
      return;
    }

    const result = increment(n);
    res.json({ result });
  } catch (err: any) {
    res.status(422).json({ error: err.message });
  }
}

export { getLCM, incrementNumber };
