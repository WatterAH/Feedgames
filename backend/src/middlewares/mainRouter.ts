import express from "express";
import userRouter from "../routers/userRouter";
import postRouter from "../routers/postRouter";
import interactionRouter from "../routers/socialRouter";
import valorantRouter from "../routers/valorant.router";
import searchRouter from "../routers/searchRouter";
import alertRouter from "../routers/alertRouter";
import serviceRouter from "../routers/serviceRouter";
import inboxRouter from "../routers/inboxRouter";
import messageRouter from "../routers/messageRouter";
import botsRouter from "../routers/botsRouter";

const app = express();

app.use(searchRouter);
app.use(valorantRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/parties", inboxRouter);
app.use("/messages", messageRouter);
app.use("/alerts", alertRouter);
app.use("/service", serviceRouter);
app.use("/social", interactionRouter);
app.use("/bots", botsRouter);

export { app as mainRouter };
