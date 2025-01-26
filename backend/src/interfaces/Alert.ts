import { User } from "./User";

export interface Alert {
  id: string;
  id_user: string;
  read: boolean;
  content: "p" | "u";
  id_linked: string;
  text: string;
  created_at: string;
  user: User;
}
