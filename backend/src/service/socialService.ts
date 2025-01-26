import { supabase } from "../middlewares/connection";

class SocialService {
  async interact(id_user: string, id_post: string, table: "liked" | "saved") {
    const { error } = await supabase.from(table).insert([{ id_post, id_user }]);

    return error ? false : true;
  }

  async uninteract(id_user: string, id_post: string, table: "liked" | "saved") {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id_user", id_user)
      .eq("id_post", id_post);

    return error ? false : true;
  }

  async follow(id_follower: string, id_followed: string) {
    const data = { id_follower, id_followed };
    const { error } = await supabase.from("follows").insert([data]);

    return error ? false : true;
  }

  async unfollow(id_follower: string, id_followed: string) {
    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("id_follower", id_follower)
      .eq("id_followed", id_followed);

    return error ? false : true;
  }
}

export default new SocialService();
