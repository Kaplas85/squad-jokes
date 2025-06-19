const express = require("express");
const app = express();
const jokesRouter = require("./routes/jokes");
const mathRouter = require("./routes/math");
const authRouter = require("./routes/auth");

app.use(express.json());
app.use("/jokes", jokesRouter);
app.use("/math", mathRouter);
app.use(authRouter);

module.exports = app;
