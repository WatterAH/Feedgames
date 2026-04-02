import { PostgrestError } from "@supabase/supabase-js";
import { Message, Party } from "../interfaces/Party";
import { supabase } from "../middlewares/connection";

class InboxService {
  private readonly query = `
  *,
  me:party_members!inner(user_id, last_read_at),
  party_members(last_read_at, nickname, data:users(id, name, pfp))`;

  async list(
    userId: string,
    limit: number,
    page: number,
  ): Promise<{ data: Party[] | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("parties")
      .select(this.query)
      .eq("party_members.user_id", userId)
      .limit(4, { foreignTable: "party_members" })
      .order("last_message_at", { ascending: false })
      .range(page * limit, (page + 1) * limit - 1);

    return { data, error };
  }

  async find(
    id: string,
  ): Promise<{ data: Party | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("parties")
      .select(this.query)
      .eq("id", id)
      .single();

    return { data, error };
  }

  async messages(
    partyId: string,
    limit: number,
    page: number,
  ): Promise<{ data: Message[] | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("messages")
      .select("*, user:users(id, name, pfp)")
      .eq("party_id", partyId)
      .range(page * limit, (page + 1) * limit - 1)
      .order("created_at", { ascending: false });

    return { data, error };
  }

  async send(
    data: Partial<Message>,
  ): Promise<{ data: Message | null; error: PostgrestError | null }> {
    const { data: message, error } = await supabase
      .from("messages")
      .insert([data])
      .select("*, user:users(id, name, pfp)")
      .single();

    return { data: message, error };
  }

  async create(
    data: Partial<Party>,
  ): Promise<{ data: { id: string } | null; error: PostgrestError | null }> {
    const { data: party, error } = await supabase
      .from("parties")
      .insert([data])
      .select("id")
      .single();

    return { data: party, error };
  }

  async exists(
    list: string[],
  ): Promise<{ data: string | null; error: PostgrestError | null }> {
    const { data, error } = await supabase.rpc("get_existing_party", {
      user_ids: list,
    });

    return { data, error };
  }

  async join(partyId: string, userId: string, role?: string): Promise<boolean> {
    const { error } = await supabase
      .from("party_members")
      .insert({ party_id: partyId, user_id: userId, role });

    return !error;
  }
}

export default new InboxService();
