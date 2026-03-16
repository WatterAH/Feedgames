import { PostgrestError } from "@supabase/supabase-js";
import { Alert } from "../interfaces/Alert";
import { supabase } from "../middlewares/connection";

class AlertService {
  private readonly table = "alerts" as const;
  private readonly query =
    `id, type, read, created_at, post_id, receiver_id, actor:actor_id(id, name, username, pfp), post:post_id(id, text, content:content(type, data))` as const;

  async list(
    userId: string,
    limit: number,
    page: number,
  ): Promise<{ data: Alert[] | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from(this.table)
      .select(this.query)
      .eq("receiver_id", userId)
      .order("created_at", { ascending: false })
      .range(page * limit, page * limit + limit - 1);

    return { data: data as unknown as Alert[], error };
  }

  async find(id: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select(this.query)
      .eq("id", id)
      .single();

    return { data: data as unknown as Alert, error };
  }

  async create(
    alert: Partial<Alert>,
  ): Promise<{ data: Alert | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from(this.table)
      .insert([alert])
      .select(this.query)
      .single();

    return { data: data as unknown as Alert, error };
  }

  async delete(id: string) {
    const { error } = await supabase.from(this.table).delete().eq("id", id);

    return !error;
  }

  async read(userId: string): Promise<boolean> {
    const { error } = await supabase
      .from("alerts")
      .update({ read: true })
      .eq("receiver_id", userId);

    return error ? false : true;
  }

  async hasAlerts(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from("alerts")
      .select("id")
      .eq("receiver_id", userId)
      .eq("read", false);

    return error ? false : data.length > 0;
  }
}

export default new AlertService();
