export interface Followed {
  count: number;
}

export interface Follower {
  id_follower: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  details: string;
  pfp: string | null;
  password: string;
  theme: string;
  created_at: string;
  followed: Followed[];
  followers: Follower[];
  [key: string]: any;
}
