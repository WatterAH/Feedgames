import { Request, Response } from "express";
import shortUUID from "short-uuid";
import postService from "../service/postService";
import { sendError, sendSuccess } from "../libs/responseHandler";
import { processPost } from "../libs/server";
import { PostInterface } from "../interfaces/Post";
import files from "../libs/files";

const translator = shortUUID();

class PostController {
  async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req.query;

      const parsedUserId = translator.toUUID(userId as string);
      const parsedPostId = translator.toUUID(id as string);

      const data = await postService.getPostById(parsedPostId);

      if (!data) {
        return sendError(res, "Ocurrió un error", 400);
      }

      const { responses, ...rest } = data;
      const post = processPost(rest as PostInterface, parsedUserId);
      const comments = responses.map((post) => processPost(post, parsedUserId));

      return sendSuccess(res, { post, responses: comments });
    } catch (error: any) {
      return sendError(res, error.message, 400);
    }
  }

  async getPosts(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const { current_id, page, limit, request_id } = req.query;

      const userId = translator.toUUID(current_id as string);
      const requestId = request_id
        ? translator.toUUID(request_id as string)
        : undefined;
      const parsedPage = parseInt(page as string, 10);
      const parsedLimit = parseInt(limit as string, 10);

      const posts = await postService.getPosts(
        parsedLimit,
        parsedPage,
        type,
        userId,
        requestId
      );

      if (!posts) {
        return sendError(res, "Ocurrio un error", 400);
      }

      const result = posts.map((post) => processPost(post, userId));
      return sendSuccess(res, result);
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
      const post = await postService.createPost(data);

      if (!post) {
        return sendError(res, "No se pudo subir el post", 400);
      }

      if (await postService.uploadContent(post.id, content)) {
        post.content = content;
        const result = processPost(post, "");
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

      if (await postService.updatePost(postId, data)) {
        return sendSuccess(res, true);
      }
      return sendError(res, "No se pudo actualizar el post", 400);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const postId = translator.toUUID(id);

      const post = await postService.getPostById(postId);

      if (post && post.content[0].type == "image") {
        await files.deleteFile(post.content[0].data.url, "images");
      }

      if (await postService.deletePost(postId)) {
        return sendSuccess(res, true);
      }

      return sendError(res, "No se pudo eliminar el post", 400);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new PostController();
