import { supabase } from "../middlewares/connection";
import { PostInterface } from "../interfaces/Post";

const QUERY =
  "*, liked(id_user), saved(id_user), user:users(id, username, pfp, name, followers:follows!follows_id_followed_fkey(id_follower)), responsed:posts(count), content(type, data)";

class PostService {
  async getPosts(
    limit: number = 10,
    page: number = 0,
    type: string = "feed",
    userId: string,
    requestId?: string
  ): Promise<PostInterface[] | null> {
    let query = supabase
      .from("posts")
      .select(QUERY)
      .range(page * limit, page * limit + limit - 1)
      .order("order", { ascending: false })
      .is("parentId", null);

    switch (type) {
      case "user":
        query = query.eq("user_id", requestId);
        break;
      case "liked":
      case "saved":
        return this.fetchPostsInteracted(userId, type, limit, page);
    }

    const { data, error } = await query;
    return error ? null : data;
  }

  async getPostById(id: string): Promise<PostInterface | null> {
    const { data, error } = await supabase
      .from("posts")
      .select(`${QUERY}`)
      .eq("id", id)
      .single();

    return error ? null : data;
  }

  async getPostsByParentId(
    parentId: string,
    limit: number = 10,
    page: number = 0
  ): Promise<PostInterface[] | null> {
    const { data, error } = await supabase
      .from("posts")
      .select(QUERY)
      .eq("parentId", parentId)
      .range(page * limit, page * limit + limit - 1)
      .order("order", { ascending: false });

    return error ? null : data;
  }

  async getPostBySearch(searchTerm: string): Promise<PostInterface[] | null> {
    const { data, error } = await supabase
      .from("posts")
      .select(QUERY)
      .ilike("text", `%${searchTerm}%`)
      .limit(8);

    return error ? null : data;
  }

  async createPost(
    post: Partial<PostInterface>
  ): Promise<PostInterface | null> {
    const { data, error } = await supabase
      .from("posts")
      .insert([post])
      .select(QUERY)
      .single();

    if (error) return null;
    return data;
  }

  async uploadContent(parent: string, content: any) {
    const { error } = await supabase.from("content").insert([
      {
        parent,
        ...content,
      },
    ]);
    return error ? false : true;
  }

  async updatePost(id: string, post: PostInterface) {
    const { error } = await supabase
      .from("posts")
      .update([{ edited: true, ...post }])
      .eq("id", id)
      .select(QUERY)
      .single();

    return error ? false : true;
  }

  async deletePost(id: string) {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    return error ? false : true;
  }

  private async fetchPostsInteracted(
    userId: string,
    table: "liked" | "saved",
    limit: number,
    page: number
  ): Promise<PostInterface[] | null> {
    const { data, error } = await supabase
      .from(table)
      .select(`p:posts(${QUERY})`)
      .eq("id_user", userId)
      .range(page * limit, page * limit + limit - 1);

    return error
      ? null
      : (data?.map((post) => post.p) as unknown as PostInterface[]);
  }
}

export default new PostService();
