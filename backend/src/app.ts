import express from "express";
import { config } from "./middlewares/config";
import { mainRouter } from "./middlewares/mainRouter";

const app = express();

app.use(config);
app.use(mainRouter);

export { app };
