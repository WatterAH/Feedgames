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
  responsed: number;
  parentId: string | null;
  valMatch: MatchShowCase | null;
  edited: boolean;
}
