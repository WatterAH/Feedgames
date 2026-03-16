import request from "@/functions/request";
import { Interaction } from "@/interfaces/Post";

const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

class InteractionRouter {
  private url = `${URL}/social`;

  async interact(action: Interaction) {
    request.post(`${this.url}/interact/${action.type}`, JSON.stringify(action));
  }

  async uninteract(type: "liked" | "saved", userId: string, postId: string) {
    request.delete(`${this.url}/unInteract/${type}`, { userId, postId });
  }

  async follow(followerId: string, followedId: string) {
    request.post(
      `${this.url}/follow`,
      JSON.stringify({ followerId, followedId }),
    );
  }

  async unfollow(followerId: string, followedId: string) {
    request.delete(`${this.url}/unFollow`, { followerId, followedId });
  }
}

const interactionRouter = new InteractionRouter();

export default interactionRouter;
