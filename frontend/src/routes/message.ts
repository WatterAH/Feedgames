import { Message } from "@/interfaces/Party";
import request from "@/lib/request";

const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

class MessageRouter {
  private url = `${URL}/messages`;

  async list(partyId: string, page: number, limit: number): Promise<Message[]> {
    return request.get(`${this.url}/${partyId}?page=${page}&limit=${limit}`);
  }

  async send(data: Partial<Message>): Promise<Message> {
    return request.post(this.url, JSON.stringify(data));
  }
}

const messageRouter = new MessageRouter();

export default messageRouter;
