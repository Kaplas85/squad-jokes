const express = require("express");
const app = express();
const jokesRouter = require("./routes/jokes");
const mathRouter = require("./routes/math");

app.use(express.json());
app.use("/jokes", jokesRouter);
app.use("/math", mathRouter);

module.exports = app;
