import { supabase } from "../middlewares/connection";
import { PostInterface } from "../interfaces/Post";
import { PostgrestError } from "@supabase/supabase-js";

class PostService {
  private readonly table = "posts" as const;
  private readonly query =
    "*, liked(id_user), saved(id_user), user:users(id, username, pfp, name, followers:follows!follows_id_followed_fkey(id_follower)), responsed:posts!parentId(count), content(type, data)" as const;

  async list(
    limit: number,
    page: number,
  ): Promise<{
    data: PostInterface[] | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from(this.table)
      .select(this.query)
      .range(page * limit, page * limit + limit - 1)
      .order("order", { ascending: false })
      .is("parentId", null);

    return { data, error };
  }

  async from(
    userId: string,
    limit: number,
    page: number,
  ): Promise<{
    data: PostInterface[] | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from(this.table)
      .select(this.query)
      .eq("user_id", userId)
      .range(page * limit, page * limit + limit - 1)
      .order("order", { ascending: false })
      .is("parentId", null);

    return { data, error };
  }

  async interacted(
    type: "liked" | "saved",
    userId: string,
    limit: number,
    page: number,
  ): Promise<{
    data: PostInterface[] | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from(type)
      .select(`p:posts(${this.query})`)
      .eq("id_user", userId)
      .range(page * limit, page * limit + limit - 1);

    if (error) return { data: null, error };

    return {
      data: data.map((item: any) => item.p),
      error: null,
    };
  }

  async top(
    limit: number,
  ): Promise<{ data: PostInterface[] | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .rpc("get_top_liked_posts")
      .select(this.query)
      .limit(limit);

    return { data, error };
  }

  async find(
    id: string,
  ): Promise<{ data: PostInterface | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("posts")
      .select(this.query)
      .eq("id", id)
      .single();

    return { data, error };
  }

  async search(
    query: string,
  ): Promise<{ data: PostInterface[] | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("posts")
      .select(this.query)
      .ilike("text", `%${query}%`);

    return { data, error };
  }

  async replies(
    parent: string,
    limit: number,
    page: number,
  ): Promise<{
    data: PostInterface[] | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from("posts")
      .select(this.query)
      .eq("parentId", parent)
      .range(page * limit, page * limit + limit - 1)
      .order("order", { ascending: false });

    return { data, error };
  }

  async create(
    post: Partial<PostInterface>,
  ): Promise<{ data: PostInterface | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("posts")
      .insert([post])
      .select(this.query)
      .single();

    return { data, error };
  }

  async content(parent: string, content: any) {
    const { error } = await supabase.from("content").insert([
      {
        parent,
        ...content,
      },
    ]);
    return error ? false : true;
  }

  async update(id: string, post: PostInterface) {
    const { error } = await supabase
      .from("posts")
      .update([{ edited: true, ...post }])
      .eq("id", id)
      .select(this.query)
      .single();

    return error ? false : true;
  }

  async delete(id: string) {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    return error ? false : true;
  }
}

export default new PostService();
