import { Message } from "@/interfaces/Party";
import request from "@/lib/request";

const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

class MessageRouter {
  private url = `${URL}/messages`;

  async list(
    partyId: string,
    page: number,
    limit: number,
    userId: string,
  ): Promise<Message[]> {
    return request.get(
      `${this.url}/${partyId}?page=${page}&limit=${limit}&userId=${userId}`,
    );
  }

  async send(data: Partial<Message>): Promise<Message> {
    return request.post(this.url, JSON.stringify(data));
  }

  hasUnread(userId: string): Promise<boolean> {
    return request.get(`${this.url}/hasUnread/${userId}`);
  }

  markAsRead(partyId: string, userId: string): Promise<boolean> {
    return request.post(
      `${this.url}/markAsRead`,
      JSON.stringify({ partyId, userId }),
    );
  }
}

const messageRouter = new MessageRouter();

export default messageRouter;
