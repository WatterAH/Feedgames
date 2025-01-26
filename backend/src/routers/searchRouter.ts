import { Router } from "express";
import searchController from "../controllers/searchController";

const searchRouter = Router();

searchRouter.get("/search/posts", searchController.getPostBySearch);
searchRouter.get("/search/users", searchController.getProfileBySearch);
searchRouter.get("/search/tendency", searchController.getTendencyPosts);

export default searchRouter;
