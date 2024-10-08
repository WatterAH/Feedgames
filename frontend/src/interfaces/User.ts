export const defaultUser: User = {
  created_at: "",
  details: "",
  id: "",
  name: "",
  pfp: "",
  username: "",
  followed: 0,
  followers: 0,
  follow: false,
  riotId: {
    puuid: "",
    gameName: "",
    tagLine: "",
  },
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
  followed: number;
  followers: number;
  follow: boolean;
  riotId: {
    puuid: string;
    gameName: string;
    tagLine: string;
  };
}
