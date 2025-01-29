import express from "express";
import userRouter from "../routers/userRouter";
import postRouter from "../routers/postRouter";
import interactionRouter from "../routers/interactionRouter";
import valorantRouter from "../routers/valorant.router";
import searchRouter from "../routers/searchRouter";
import alertRouter from "../routers/alertRouter";
import serviceRouter from "../routers/serviceRouter";

const app = express();

app.use(userRouter);
app.use(postRouter);
app.use(searchRouter);
app.use(alertRouter);
app.use(serviceRouter);
app.use(valorantRouter);
app.use(interactionRouter);

export { app as mainRouter };
