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
  content: string;
  tags: string[];
  order: string;
  user: User;
  user_id: string;
  publicUrl: string | null;
  liked: Likes[];
  isLiked: boolean;
  saved: Saves[];
  isSaved: boolean;
  responsed: number;
  responses: PostInterface[];
  isCommented: boolean;
}
