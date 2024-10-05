import { User } from "./User";
import { MatchShowCase } from "./Valorant";

export interface PostInterface {
  id: string;
  content: string;
  order: string;
  user: User;
  user_id: string;
  publicUrl: string | null;
  liked: number;
  isLiked: boolean;
  saved: number;
  isSaved: boolean;
  comments: number;
  isCommented: boolean;
  valMatch: MatchShowCase | null;
}

export interface Note {
  id: string;
  id_user: string;
  user: {
    pfp: string | undefined;
    username: string;
  };
  note: string;
  created_at: string;
}
