import { Theme } from "@/constants/themes";

export const defaultUser: User = {
  created_at: "",
  details: "",
  id: "aRwwhM2xr7U9nWiFC12Ymb",
  name: "",
  pfp: "",
  email: "",
  password: "",
  username: "",
  followed: 0,
  followers: 0,
  follow: false,
  riotId: {
    puuid: "",
    gameName: "",
    tagLine: "",
  },
  theme: "default",
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
  password: string;
  email: string;
  follow: boolean;
  riotId: {
    puuid: string | undefined;
    gameName: string;
    tagLine: string;
  };
  theme: Theme;
}
