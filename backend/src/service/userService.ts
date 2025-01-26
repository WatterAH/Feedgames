import { User } from "../interfaces/User";
import { supabase } from "../middlewares/connection";

const QUERY =
  "*, followed:follows!follows_id_follower_fkey(count), followers:follows!follows_id_followed_fkey(id_follower)";

class UserService {
  async getProfileById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select(QUERY)
      .eq("id", id)
      .single();

    return error ? null : data;
  }

  async getProfileBySearch(searchTerm: string): Promise<User[] | null> {
    const { data, error } = await supabase
      .from("users")
      .select(QUERY)
      .or(`username.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%`)
      .order("username")
      .limit(10);

    return error ? null : data;
  }

  async getProfilByUsername(username: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select(QUERY)
      .eq("username", username)
      .single();

    return error ? null : data;
  }

  async createProfile(user: User): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .insert([user])
      .select(QUERY)
      .single();

    return error ? null : data;
  }

  async updateProfile(id: string, user: User): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .update([user])
      .eq("id", id)
      .select(QUERY)
      .single();

    return error ? null : data;
  }
}

export default new UserService();
