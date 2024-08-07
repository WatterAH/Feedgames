import { User, defaultUser } from "./User";
import { MatchShowCase } from "./Valorant";

export interface PostInterface {
  id: string;
  content: string;
  tags: string[];
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

export const defaultPost: PostInterface = {
  id: "",
  user_id: "",
  comments: 0,
  liked: 0,
  saved: 0,
  content: "",
  isLiked: false,
  isSaved: false,
  isCommented: false,
  order: "",
  publicUrl: null,
  tags: [],
  user: defaultUser,
  valMatch: null,
};
