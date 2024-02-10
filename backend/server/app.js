import express from "express";
import { config } from "./middlewares/config.js";
import { mainRouter } from "./middlewares/mainRouter.js";

const app = express();

//Mounting middlewares for configuration purposes.
app.use(config);
// Mounting routers middlewares.
app.use(mainRouter);

export { app };
