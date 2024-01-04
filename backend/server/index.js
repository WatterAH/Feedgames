import express from "express";
import cors from "cors";
import cookie from "cookie-parser";
import { accountRouter } from "./routers/account.router.js";
import { feedRouter } from "./routers/feed.router.js";
import { postRouter } from "./routers/post.router.js";
import { actionsRouter } from "./routers/actions.router.js";
import { commentRounter } from "./routers/comment.rounter.js";
import { interactionsRouter } from "./routers/interactions.router.js";
import { suggestionsRouter } from "./routers/suggestions.router.js";
import { deleteRouter } from "./routers/delete.router.js";

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://feedgames.vercel.app",
    "http://192.168.1.70:19006",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(cookie());
app.use(cors(corsOptions));
app.use(accountRouter);
app.use(feedRouter);
app.use(postRouter);
app.use(actionsRouter);
app.use(commentRounter);
app.use(interactionsRouter);
app.use(suggestionsRouter);
app.use(deleteRouter);

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
