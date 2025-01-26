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
      const { userId, searchTerm } = req.query;

      const parsedUserId = translator.toUUID(userId as string);

      const posts = await postService.getPostBySearch(searchTerm as string);

      if (!posts) {
        return sendError(res, "Ocurrio un error", 400);
      }

      const result = posts.map((post) => processPost(post, parsedUserId));
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getTendencyPosts(req: Request, res: Response) {
    try {
      const { userId } = req.query;

      const parsedId = translator.toUUID(userId as string);

      const posts = await postService.getPosts(100, 0, "feed", parsedId);

      if (!posts) {
        return sendError(res, "Ocurrio un error", 400);
      }

      const topLikedPosts = posts
        .sort((a, b) => b.liked.length - a.liked.length)
        .slice(0, 5)
        .map((post) => processPost(post, parsedId));

      return sendSuccess(res, topLikedPosts);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getProfileBySearch(req: Request, res: Response) {
    try {
      const { userId, searchTerm } = req.query;

      const parsedId = translator.toUUID(userId as string);

      const users = await userService.getProfileBySearch(searchTerm as string);

      if (!users) {
        return sendError(res, "No se pudo completar la busqueda", 500);
      }

      const result = users.map((user) => processUser(user, parsedId));
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new SearchController();
