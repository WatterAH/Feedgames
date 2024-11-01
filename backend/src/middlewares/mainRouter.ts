import express from "express";
import { accountRouter } from "../routers/account.router";
import { feedRouter } from "../routers/feed.router";
import { postRouter } from "../routers/post.router";
import { interactionsRouter } from "../routers/interactions.router";
import { valorantRouter } from "../routers/valorant.router";
import { notifyRouter } from "../routers/notification.router";
import { profileRouter } from "../routers/profile.router";

const app = express();

app.use(accountRouter);
app.use(feedRouter);
app.use(postRouter);
app.use(profileRouter);
app.use(interactionsRouter);
app.use(valorantRouter);
app.use(notifyRouter);

export { app as mainRouter };
