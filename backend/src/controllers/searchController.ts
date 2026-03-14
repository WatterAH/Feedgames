import shortUUID from "short-uuid";
import postService from "../service/postService";
import { processPost, processUser } from "../libs/server";
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../libs/responseHandler";
import userService from "../service/userService";

const translator = shortUUID();

class SearchController {
  async getPostBySearch(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;
      const searchTerm = req.query.searchTerm as string;

      const parsedUserId = translator.toUUID(userId);

      const query = await postService.search(searchTerm);
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      const posts = query.data.map((post) => processPost(post, parsedUserId));
      return sendSuccess(res, posts);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getTendencyPosts(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;

      const parsedId = translator.toUUID(userId);

      const query = await postService.top(10);
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      const posts = query.data.map((post) => processPost(post, parsedId));

      return sendSuccess(res, posts);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getProfileBySearch(req: Request, res: Response) {
    try {
      const userId = req.query.userId;
      const searchTerm = req.query.searchTerm as string;

      const parsedId = translator.toUUID(userId as string);

      const query = await userService.find(searchTerm, "search");
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      const result = query.data.map((user) => processUser(user, parsedId));
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new SearchController();
