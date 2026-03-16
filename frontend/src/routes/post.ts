import request from "@/functions/request";
import { ContentObject, PostInterface } from "@/interfaces/Post";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

class PostRouter {
  private url = `${URL}/posts`;

  async list(
    type: string,
    userId: string,
    page: number,
    limit: number,
    targetId?: string,
  ): Promise<PostInterface[]> {
    return request.get(
      `${this.url}/list/${type}?request_id=${userId}&page=${page}&limit=${limit}&target_id=${targetId}`,
    );
  }

  async find(id: string, userId: string): Promise<PostInterface> {
    return request.get(`${this.url}/${id}?userId=${userId}`);
  }

  async create(
    userId: string,
    text: string,
    content: ContentObject,
    parentId?: string,
  ): Promise<PostInterface> {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("text", text);
    formData.append("content", JSON.stringify(content));
    if (parentId) formData.append("parentId", parentId);
    if (content?.type == "image") formData.append("image", content.data);

    return request.post(this.url, formData, true);
  }

  async delete(id: string): Promise<void> {
    return request.delete(`${this.url}/${id}`);
  }

  async update(
    id: string,
    post: Partial<PostInterface>,
  ): Promise<PostInterface> {
    return request.put(`${this.url}/${id}`, JSON.stringify(post));
  }

  async replies(
    parentId: string,
    userId: string,
    page: number,
    limit: number,
  ): Promise<PostInterface[]> {
    return request.get(
      `${this.url}/replies/${parentId}?userId=${userId}&page=${page}&limit=${limit}`,
    );
  }
}

const postRouter = new PostRouter();

export default postRouter;
