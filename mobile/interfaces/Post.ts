import { User, defaultUser } from "./User";
import { MatchShowCase } from "./Valorant";

export interface DateObj {
  day: number;
  month: string;
  year: number;
}

export interface TimeObj {
  hours: number;
  minutes: number;
  seconds: number;
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
  created_at: { day: 1, month: "Enero", year: 2024 },
  isLiked: false,
  isSaved: false,
  isCommented: false,
  order: "",
  publicUrl: null,
  tags: [],
  user: defaultUser,
  valMatch: null,
};
