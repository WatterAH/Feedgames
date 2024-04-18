import express from "express";
import { accountRouter } from "../routers/account.router";
import { feedRouter } from "../routers/feed.router";
import { postRouter } from "../routers/post.router";
import { actionsRouter } from "../routers/actions.router";
import { commentRounter } from "../routers/comment.rounter";
import { interactionsRouter } from "../routers/interactions.router";
import { suggestionsRouter } from "../routers/suggestions.router";
import { deleteRouter } from "../routers/delete.router";
import { valorantRouter } from "../routers/valorant.router";

const app = express();

app.use(accountRouter);
app.use(feedRouter);
app.use(postRouter);
app.use(actionsRouter);
app.use(commentRounter);
app.use(interactionsRouter);
app.use(suggestionsRouter);
app.use(deleteRouter);
app.use(valorantRouter);

export { app as mainRouter };
