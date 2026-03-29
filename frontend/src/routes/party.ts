import { Party } from "@/interfaces/Party";
import request from "@/lib/request";

const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

class PartyRouter {
  private url = `${URL}/parties`;

  list(userId: string, page: number, limit: number): Promise<Party[]> {
    return request.get(
      `${this.url}/list/${userId}?page=${page}&limit=${limit}`,
    );
  }

  create(userId: string, users: string[]): Promise<Party> {
    return request.post(
      `${this.url}/create`,
      JSON.stringify({ id: userId, users }),
    );
  }

  find(partyId: string, userId: string): Promise<Party> {
    return request.get(`${this.url}/${partyId}?userId=${userId}`);
  }
}

const partyRouter = new PartyRouter();

export default partyRouter;
