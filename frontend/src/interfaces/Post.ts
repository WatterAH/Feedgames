import { User } from "./User";

export interface DateObj {
  day: number;
  month: string;
  year: number;
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
  liked: string[];
  isLiked: boolean;
  saved: string[];
  isSaved: boolean;
  comments: string[];
}

export const defaultPost: PostInterface = {
  id: "",
  user_id: "",
  comments: [],
  liked: [],
  saved: [],
  content: "",
  created_at: { day: 1, month: "Enero", year: 2024 },
  isLiked: false,
  isSaved: false,
  order: "",
  publicUrl: null,
  tags: [],
  user: {
    created_at: "",
    details: "",
    id: "",
    name: "",
    pfp: undefined,
    username: "",
  },
};
