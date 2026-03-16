import { PostInterface } from "./Post";
import { User } from "./User";

export interface AlertInterface {
  id: string;
  type: AlertType;
  created_at: string;
  post_id: string;
  user: User;
  post: PostInterface | null;
  read: boolean;
  receiver_id: string;
}

export type AlertType = "like" | "reply" | "follow";
