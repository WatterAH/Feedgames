import { Request, Response } from "express";
import { sendError, sendSuccess } from "../libs/responseHandler";
import GamerBot from "../service/bot";
import postService from "../service/postService";

class BotsController {
  async test(_req: Request, res: Response) {
    try {
      const quark = new GamerBot("quark");
      const result = await quark.forcePost("ya duermeme we");
      if (!result.success) return sendError(res, result.error, 500);
      return sendSuccess(res, result);
    } catch (error: any) {
      sendError(res, error.message, 500);
    }
  }

  async post(_req: Request, res: Response) {
    try {
      const bot = new GamerBot("quark");
      const result = await bot.post();
      if (!result.success) return sendError(res, result.error, 500);

      const data = { user_id: bot.getId(), text: result.post };
      const post = await postService.create(data);
      if (post.error) return sendError(res, post.error.message, 400);
      if (!post.data) return sendError(res, "Not found", 404);

      await postService.content(post.data.id, {
        type: "textonly",
        data: null,
      });

      await bot.update(result.memoryId, { post_id: post.data.id });

      return sendSuccess(res, post.data);
    } catch (error: any) {
      sendError(res, error.message, 500);
    }
  }
}

export default new BotsController();
