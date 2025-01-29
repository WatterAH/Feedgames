import { User } from "../interfaces/User";
import { mailData } from "../libs/recover-mail";
import { transporter } from "../middlewares/config";
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

  async getProfileByEmail(Email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select(QUERY)
      .eq("email", Email)
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

  async updateProfile(id: string, user: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .update([user])
      .eq("id", id)
      .select(QUERY)
      .single();

    return error ? null : data;
  }

  async sendMail(token: string | undefined, mail: string) {
    const data = mailData(mail, token);

    const result = await transporter.sendMail(data);

    return result;
  }
}

export default new UserService();
