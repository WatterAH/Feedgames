import { Alert } from "../interfaces/Alert";
import { supabase } from "../middlewares/connection";

class AlertService {
  async createNotify(
    id_user: string,
    content: "p" | "u",
    id_linked: string,
    text: string,
    notifier: string
  ) {
    const data = { id_user, content, id_linked, text, notifier };
    const { error } = await supabase.from("notify").insert([data]);

    return error ? false : true;
  }

  async getAlerts(
    userId: string,
    limit: number,
    page: number
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

  async deleteAlert(id: string) {
    const { error } = await supabase.from("notify").delete().eq("id", id);

    return error ? false : true;
  }
}

export default new AlertService();
