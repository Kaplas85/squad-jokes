const mathRouter = require("express").Router();
const { getLCM, incrementNumber } = require("../controllers/math");

mathRouter.get("/lcm", getLCM);
mathRouter.get("/increment", incrementNumber);

module.exports = mathRouter;
