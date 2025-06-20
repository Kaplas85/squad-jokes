const express = require("express");
const app = express();
const jokesRouter = require("./routes/jokes");
const mathRouter = require("./routes/math");
const authRouter = require("./routes/auth");
const notificationRouter = require("./routes/notifications");

app.use(express.json());
app.use("/jokes", jokesRouter);
app.use("/math", mathRouter);
app.use("/notifications", notificationRouter);
app.use(authRouter);

module.exports = app;
