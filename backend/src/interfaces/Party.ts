export interface Party {
  id: string;
  name: string;
  theme: string;
  createed_at: string;
  last_message: string;
  last_message_at: string;
}

export interface Message {
  id: string;
  party_id: string;
  user_id: string;
  reply_to: string | null;
  content: string;
  type: "system" | "text" | "image" | "post";
  metadata: any;
  created_at: string;
  edited: boolean;
  user: {
    id: string;
    name: string;
    pfp: string | undefined;
  };
}
