import { User } from "./User";
import { MatchShowCase } from "./Valorant";

export interface PostInterface {
  id: string;
  text: string;
  order: string;
  user: User;
  user_id: string;
  liked: number;
  isLiked: boolean;
  saved: number;
  isSaved: boolean;
  responsed: number;
  parentId: string | null;
  edited: boolean;
  content:
    | { type: "image"; data: { url: string } }
    | { type: "valorant"; data: MatchShowCase }
    | { type: "textonly"; data: null };
}
