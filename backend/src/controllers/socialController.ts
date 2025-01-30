import shortUUID from "short-uuid";
import alertService from "../service/alertService";
import socialService from "../service/socialService";
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../libs/responseHandler";

const translator = shortUUID();

class InteractionController {
  async interact(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const { userId, postId } = req.body;

      const id_user = translator.toUUID(userId);
      const id_post = translator.toUUID(postId);

      await socialService.uninteract(id_user, id_post, type as any);

      if (await socialService.interact(id_user, id_post, type as any)) {
        if (type == "liked") {
          const { postUser, username } = req.body;
          const post_user = translator.toUUID(postUser);
          if (post_user !== id_user) {
            const text = "Le gustó tu hilo";
            alertService.createNotify(post_user, "p", postId, text, username);
          }
        }

        return sendSuccess(res, true);
      }

      return sendError(res, "Failed to interact", 400);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async uninteract(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const { userId, postId } = req.body;

      const id_user = translator.toUUID(userId);
      const id_post = translator.toUUID(postId);

      if (await socialService.uninteract(id_user, id_post, type as any)) {
        return sendSuccess(res, true);
      }

      return sendError(res, "Failed to undo interaction", 400);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async follow(req: Request, res: Response) {
    try {
      const { followerId, followedId, username } = req.body;

      const follower = translator.toUUID(followerId);
      const followed = translator.toUUID(followedId);

      await socialService.unfollow(follower, followed);

      if (await socialService.follow(follower, followed)) {
        const text = `${username} comenzó a seguirte`;
        alertService.createNotify(followed, "u", followerId, text, username);

        return sendSuccess(res, true);
      }

      return sendError(res, "Failed to follow", 400);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async unfollow(req: Request, res: Response) {
    try {
      const { followerId, followedId } = req.body;

      const id_follower = translator.toUUID(followerId);
      const id_followed = translator.toUUID(followedId);

      if (await socialService.unfollow(id_follower, id_followed)) {
        return sendSuccess(res, true);
      }

      return sendError(res, "Failed to unfollow", 400);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new InteractionController();
