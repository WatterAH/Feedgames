import { Request, Response } from "express";
import shortUUID from "short-uuid";
import postService from "../service/postService";
import { sendError, sendSuccess } from "../libs/responseHandler";
import { processPost } from "../libs/server";
import files from "../libs/files";
import alertService from "../service/alertService";

const translator = shortUUID();

class PostController {
  async getPostById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const userId = req.query.userId as string;

      const postId = translator.toUUID(id);
      const parsedUserId = translator.toUUID(userId);

      const query = await postService.find(postId);
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      const post = processPost(query.data, parsedUserId);

      return sendSuccess(res, post);
    } catch (error: any) {
      return sendError(res, error.message, 400);
    }
  }

  async getPosts(req: Request, res: Response) {
    try {
      const type = req.params.type as "feed" | "saved" | "liked" | "user";
      const rawlimit = req.query.limit as string;
      const rawpage = req.query.page as string;
      const request_id = req.query.request_id as string;
      const target_id = req.query.target_id as string;

      const page = parseInt(rawpage, 10);
      const limit = parseInt(rawlimit, 10);
      const requester = translator.toUUID(request_id);
      const target = target_id ? translator.toUUID(target_id) : null;

      let query;

      switch (type) {
        case "feed":
          query = await postService.list(limit, page);
          break;
        case "user":
          if (!target) return sendError(res, "Target Required", 400);
          query = await postService.from(requester, limit, page);
          break;
        case "liked":
        case "saved":
          query = await postService.interacted(type, requester, limit, page);
          break;
        default:
          return sendError(res, "Invalid type", 400);
      }

      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      const posts = query.data.map((post) => processPost(post, requester));
      return sendSuccess(res, posts);
    } catch (error: any) {
      console.log(error);
      return sendError(res, error.message, 500);
    }
  }

  async getResponses(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const rawlimit = req.query.limit as string;
      const rawpage = req.query.page as string;
      const userId = req.query.userId as string;

      const parentId = translator.toUUID(id);
      const parsedUserId = translator.toUUID(userId);
      const limit = parseInt(rawlimit, 10);
      const page = parseInt(rawpage, 10);

      const query = await postService.replies(parentId, limit, page);
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      const replies = query.data.map((post) => processPost(post, parsedUserId));
      return sendSuccess(res, replies);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      let { userId, text, parentId, content } = req.body;
      const image = req.file;

      const user_id = translator.toUUID(userId);
      parentId = parentId ? translator.toUUID(parentId) : null;
      content = JSON.parse(content);

      const imageUrl = await files.uploadPostImage(image);

      if (imageUrl) content = { type: "image", data: { url: imageUrl } };
      if (!content) content = { type: "textonly", data: null };

      const data = { user_id, text, parentId };
      const post = await postService.create(data);
      if (post.error) return sendError(res, post.error.message, 400);
      if (!post.data) return sendError(res, "Not found", 404);

      if (parentId) {
        const parent = await postService.find(parentId);
        if (parent.error) return sendError(res, parent.error.message, 400);
        if (!parent.data) return sendError(res, "Not found", 404);

        if (parent.data.user_id !== user_id) {
          await alertService.create({
            post_id: post.data.id,
            actor_id: user_id,
            type: "reply",
            receiver_id: parent.data.user_id,
          });
        }
      }

      if (await postService.content(post.data.id, content)) {
        post.data.content = content;
        const result = processPost(post.data, "");
        return sendSuccess(res, result);
      }
      return sendError(res, "No se pudo subir el contenido", 400);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      const postId = translator.toUUID(id);

      if (await postService.update(postId, data)) {
        return sendSuccess(res, true);
      }
      return sendError(res, "No se pudo actualizar el post", 400);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const postId = translator.toUUID(id);

      const query = await postService.find(postId);
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      if (query.data.content[0].type == "image") {
        await files.deleteFile(query.data.content[0].data.url, "images");
      }

      if (await postService.delete(postId)) {
        return sendSuccess(res, true);
      }

      return sendError(res, "No se pudo eliminar el post", 400);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new PostController();
