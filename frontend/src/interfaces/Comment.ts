import { DateObj } from "./Post";
import { User, defaultUser } from "./User";

export const defaultComment: CommentInterface = {
  id: "",
  comment: "",
  created_at: { day: 1, month: "Enero", year: 2024 },
  order: "",
  id_post: "",
  id_user: "",
  response: false,
  responses: [],
  user: defaultUser,
  comments_liked: [],
  isLiked: false,
};

export interface CommentInterface {
  id: string;
  comment: string;
  created_at: DateObj;
  order: string;
  id_post: string;
  id_user: string;
  response: boolean;
  responses: string[];
  user: User;
  comments_liked: string[];
  isLiked: boolean;
}
