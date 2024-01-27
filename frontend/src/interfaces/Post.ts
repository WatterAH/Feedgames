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
  user_id: string;
  publicUrl: string | null;
  liked: string[];
  saved: string[];
  comments: string[];
}
