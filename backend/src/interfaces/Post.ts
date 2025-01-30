import { User } from "./User";

export type ContentTypes = "image" | "valorant" | "pixelart" | "textonly";

export interface Likes {
  id_user: string;
}

export interface Saves {
  id_user: string;
}

export interface Comments {
  id: string;
  id_user: string;
}

export interface PostInterface {
  id: string;
  created_at: string;
  text: string;
  content: { type: ContentTypes; data: any }[];
  tags: string[];
  order: string;
  user: User;
  user_id: string;
  publicUrl: string | null;
  liked: Likes[];
  saved: Saves[];
  responsed: { count: number }[];
  responses: PostInterface[];
  isCommented: boolean;
  [key: string]: any;
}
