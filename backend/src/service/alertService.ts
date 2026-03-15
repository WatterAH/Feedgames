import { PostgrestError } from "@supabase/supabase-js";
import { Alert } from "../interfaces/Alert";
import { supabase } from "../middlewares/connection";

class AlertService {
  private readonly table = "alerts" as const;
  private readonly query =
    `id, type, read, created_at, post_id, actor:actor_id(id, name, username, pfp), post:post_id(id, text, content:content(type, data))` as const;

  async createNotify(
    id_user: string,
    content: "p" | "u",
    id_linked: string,
    text: string,
    notifier: string,
  ) {
    const data = { id_user, content, id_linked, text, notifier };
    const { error } = await supabase.from("notify").insert([data]);

    return error ? false : true;
  }

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

  async getAlerts(
    userId: string,
    limit: number,
    page: number,
  ): Promise<Alert[] | null> {
    const { data, error } = await supabase
      .from("notify")
      .select("*, user:notifier(id, username, pfp)")
      .eq("id_user", userId)
      .order("created_at", { ascending: false })
      .range(page * limit, page * limit + limit - 1);

    return error ? null : data;
  }

  async readAlerts(userId: string) {
    const { error } = await supabase
      .from("notify")
      .update({ read: true })
      .eq("id_user", userId)
      .eq("read", false);

    return error ? false : true;
  }
}

export default new AlertService();
