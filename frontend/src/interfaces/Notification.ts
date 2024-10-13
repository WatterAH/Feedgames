export interface Notification {
  id: string;
  id_user: string;
  read: boolean;
  content: string;
  id_linked: string;
  text: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    pfp: string;
  };
}
