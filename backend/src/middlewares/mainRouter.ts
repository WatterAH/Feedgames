import express from "express";
import userRouter from "../routers/userRouter";
import postRouter from "../routers/postRouter";
import interactionRouter from "../routers/socialRouter";
import valorantRouter from "../routers/valorant.router";
import searchRouter from "../routers/searchRouter";
import alertRouter from "../routers/alertRouter";
import serviceRouter from "../routers/serviceRouter";
import inboxRouter from "../routers/inboxRouter";

const app = express();

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use(searchRouter);
app.use("/parties", inboxRouter);
app.use("/alerts", alertRouter);
app.use("/service", serviceRouter);
app.use(valorantRouter);
app.use("/social", interactionRouter);

export { app as mainRouter };
