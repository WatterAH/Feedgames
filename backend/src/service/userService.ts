import { PostgrestError } from "@supabase/supabase-js";
import { User, UserIdentifier } from "../interfaces/User";
import { mailData } from "../libs/recover-mail";
import { transporter } from "../middlewares/config";
import { supabase } from "../middlewares/connection";

class UserService {
  private readonly table = "users" as const;
  private readonly query =
    "*, followed:follows!follows_id_follower_fkey(count), followers:follows!follows_id_followed_fkey(id_follower)";

  async find(
    value: string,
    type: UserIdentifier,
  ): Promise<{ data: User | null; error: PostgrestError | null }>;

  async find(
    value: string,
    type: "search",
  ): Promise<{ data: User[] | null; error: PostgrestError | null }>;

  async find(
    value: string,
    type: UserIdentifier | "search",
  ): Promise<{ data: User | null | User[]; error: PostgrestError | null }> {
    const query = supabase.from(this.table).select(this.query);

    if (type === "search") {
      const { data, error } = await query
        .or(`username.ilike.%${value}%,name.ilike.%${value}%`)
        .limit(10);
      return { data, error };
    }

    const { data, error } = await query.eq(type, value).single();
    return { data, error };
  }

  async create(
    user: User,
  ): Promise<{ data: User | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from(this.table)
      .insert([user])
      .select(this.query)
      .single();

    return { data, error };
  }

  async update(
    id: string,
    user: Partial<User>,
  ): Promise<{ data: User | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from(this.table)
      .update([user])
      .eq("id", id)
      .select(this.query)
      .single();

    return { data, error };
  }

  async sendMail(token: string | undefined, mail: string) {
    const data = mailData(mail, token);

    const result = await transporter.sendMail(data);

    return result;
  }
}

export default new UserService();
