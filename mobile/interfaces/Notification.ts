export interface Notification {
  id: string;
  id_user: string;
  read: boolean;
  content: "c" | "p" | "u";
  id_linked: string;
  text: string;
  created_at: string;
  type: 0 | 1 | 2;
}
