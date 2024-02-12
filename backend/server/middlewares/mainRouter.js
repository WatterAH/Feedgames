import express from "express";
import { accountRouter } from "../routers/account.router.js";
import { feedRouter } from "../routers/feed.router.js";
import { postRouter } from "../routers/post.router.js";
import { actionsRouter } from "../routers/actions.router.js";
import { commentRounter } from "../routers/comment.rounter.js";
import { interactionsRouter } from "../routers/interactions.router.js";
import { suggestionsRouter } from "../routers/suggestions.router.js";
import { deleteRouter } from "../routers/delete.router.js";
import { valorantRouter } from "../routers/valorant.router.js";

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
