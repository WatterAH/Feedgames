import shortUUID from "short-uuid";
import alertService from "../service/alertService";
import socialService from "../service/socialService";
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../libs/responseHandler";

const translator = shortUUID();

class InteractionController {
  async interact(req: Request, res: Response) {
    try {
      const type = req.params.type as "liked" | "saved";
      const userId = req.body.userId;
      const postId = req.body.postId;
      const postUser = req.body.postUser;

      const id_user = translator.toUUID(userId);
      const id_post = translator.toUUID(postId);

      await socialService.uninteract(id_user, id_post, type);
      await socialService.interact(id_user, id_post, type);

      if (type == "liked") {
        const post_user = translator.toUUID(postUser);
        if (post_user !== id_user) {
          await alertService.create({
            post_id: id_post,
            actor_id: id_user,
            type: "like",
            receiver_id: post_user,
          });
        }
      }

      return sendSuccess(res, "OK");
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async uninteract(req: Request, res: Response) {
    try {
      const type = req.params.type as "liked" | "saved";
      const userId = req.body.userId;
      const postId = req.body.postId;

      const id_user = translator.toUUID(userId);
      const id_post = translator.toUUID(postId);

      await socialService.uninteract(id_user, id_post, type);

      return sendSuccess(res, "OK");
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async follow(req: Request, res: Response) {
    try {
      const { followerId, followedId } = req.body;

      const follower = translator.toUUID(followerId);
      const followed = translator.toUUID(followedId);

      await socialService.unfollow(follower, followed);

      if (await socialService.follow(follower, followed)) {
        alertService.create({
          post_id: null,
          actor_id: follower,
          type: "follow",
          receiver_id: followed,
        });

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
