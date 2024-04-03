export const defaultUser: User = {
  created_at: "",
  details: "",
  id: "",
  name: "",
  pfp: "",
  username: "",
  followed: [],
  followers: [],
  follow: false,
  verified: false,
};

export interface Followed {
  id_followed: string;
}

export interface Follower {
  id_follower: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  details: string;
  pfp: string | undefined;
  created_at: string;
  followed: Followed[];
  followers: Follower[];
  follow: boolean;
  verified: boolean;
}
