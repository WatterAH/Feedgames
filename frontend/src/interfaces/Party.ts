export interface Party {
  id: string;
  name: string;
  theme: string;
  createed_at: string;
  last_message: string;
  last_message_at: string;
  avatar: string | null;
  members: {
    id: string;
    name: string;
    pfp: string | undefined;
    last_read_at: string;
  }[];
  me: {
    last_read_at: string;
  };
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

export const defaultParty: Party = {
  id: "",
  name: "",
  theme: "",
  avatar: "",
  createed_at: "",
  last_message: "",
  last_message_at: "",
  members: [],
  me: {
    last_read_at: "",
  },
};
