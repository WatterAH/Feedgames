import { PostgrestError } from "@supabase/supabase-js";
import { Message, Party } from "../interfaces/Party";
import { supabase } from "../middlewares/connection";
import { ApiAnalysisResponse } from "@sentinel-sdk/typescript";
import { io } from "../server";

class InboxService {
  private readonly query = `
  *,
  me:party_members!inner(user_id, last_read_at),
  party_members(last_read_at, nickname, data:users(id, name, pfp)),
  last_author:users!last_message_user_id(id, name)`;

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

  async markAsRead(partyId: string, userId: string): Promise<boolean> {
    const { error } = await supabase.rpc("mark_party_as_read", {
      p_party_id: partyId,
      p_user_id: userId,
    });

    return !error;
  }

  async hasUnread(
    userId: string,
  ): Promise<{ data: any[] | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("parties")
      .select(
        `last_message_at,
      last_message_user_id,
      me:party_members!inner(last_read_at)`,
      )
      .eq("me.user_id", userId);

    return { data, error };
  }

  emitAlert(
    analysis: ApiAnalysisResponse,
    partyId: string,
    userId: string,
    messageId?: string,
  ) {
    console.log(
      "Emitting alert with recommendation:",
      analysis.ux_recommendation,
    );
    switch (analysis.ux_recommendation) {
      case "SOFT_NUDGE":
        io.to(partyId).emit("sentinel-alert", {
          ux_recommendation: analysis.ux_recommendation,
          summary: analysis.summary,
          targetId: userId,
          messageId: messageId,
        });
        break;
      case "WARNING_OVERLAY":
      case "HARD_BLOCK":
        io.to(partyId).emit("sentinel-alert", {
          ux_recommendation: analysis.ux_recommendation,
          summary: analysis.summary,
          targetId: userId,
        });
        break;
      default:
        break;
    }
  }
}

export default new InboxService();
