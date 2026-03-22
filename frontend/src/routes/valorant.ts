import { User } from "@/interfaces/User";
import { Match, MatchList } from "@/interfaces/Valorant";
import request from "@/lib/request";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

class ValRouter {
  private url = `${URL}/val`;

  async auth(userId: string): Promise<string> {
    return request.get(`${this.url}/auth/${userId}`);
  }

  async unlink(userId: string): Promise<{ user: User; token: string }> {
    return request.delete(`${this.url}/unlink/${userId}`);
  }

  async list(puuid: string): Promise<Match[]> {
    return request.get(`${this.url}/list/${puuid}`);
  }
}

const valRouter = new ValRouter();

export default valRouter;
