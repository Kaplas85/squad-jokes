import authRouter from "@routes/auth";
import jokesRouter from "@routes/jokes";
import mathRouter from "@routes/math";
import notificationRouter from "@routes/notifications";
import express from "express";

const app = express();

app.use(express.json());
app.use("/jokes", jokesRouter);
app.use("/math", mathRouter);
app.use("/notifications", notificationRouter);
app.use(authRouter);

export default app;
