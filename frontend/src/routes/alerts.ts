import request from "@/lib/request";
import { AlertInterface } from "../interfaces/Alert";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

class AlertRouter {
  private url = `${URL}/alerts`;

  async list(
    userId: string,
    page: number,
    limit: number,
  ): Promise<AlertInterface[]> {
    return request.get(
      `${this.url}/list?id=${userId}&page=${page}&limit=${limit}`,
    );
  }

  async find(id: string): Promise<AlertInterface> {
    return request.get(`${this.url}/${id}`);
  }

  async delete(id: string): Promise<void> {
    return request.delete(`${this.url}/${id}`);
  }

  async hasAlerts(userId: string): Promise<boolean> {
    return request.get(`${this.url}/hasUnreadAlerts/${userId}`);
  }

  async readAlerts(userId: string): Promise<void> {
    return request.put(`${this.url}/${userId}`, JSON.stringify({}));
  }
}
const alertRouter = new AlertRouter();

export default alertRouter;
