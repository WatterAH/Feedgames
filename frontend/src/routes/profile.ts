import request from "@/functions/request";
import { User } from "../interfaces/User";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

class UserRouter {
  private url = `${URL}/users`;

  async find(id: string, userId: string): Promise<User> {
    return request.get(`${this.url}/${id}?requestId=${userId}`);
  }

  async create(user: Partial<User>): Promise<{ user: User; token: string }> {
    return request.post(this.url, JSON.stringify(user));
  }

  async auth(
    username: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    return request.post(
      `${this.url}/auth`,
      JSON.stringify({ username, password }),
    );
  }

  async refresh(token: string): Promise<{ user: User; token: string }> {
    return request.post(`${this.url}/refresh/${token}`, JSON.stringify({}));
  }

  async update(
    userId: string,
    user: Partial<User>,
    image: File | null,
  ): Promise<{ user: User; token: string }> {
    const formData = new FormData();
    formData.append("data", JSON.stringify(user));
    if (image) formData.append("image", image);

    return request.put(`${this.url}/${userId}`, formData, true);
  }
}

const userRouter = new UserRouter();

export default userRouter;
