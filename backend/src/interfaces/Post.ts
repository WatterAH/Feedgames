import { User } from "./User";

export interface DateObj {
  day: number;
  month: string;
  year: number;
}

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
  created_at: DateObj;
  text: string;
  content: { type: string; data: any }[];
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
