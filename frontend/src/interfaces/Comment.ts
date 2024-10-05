import { User } from "./User";

export interface CommentInterface {
  id: string;
  comment: string;
  order: string;
  id_post: string;
  id_user: string;
  response: boolean;
  responses: string[];
  user: User;
  comments_liked: string[];
  isLiked: boolean;
}
