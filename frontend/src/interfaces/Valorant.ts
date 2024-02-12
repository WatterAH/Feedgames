export interface Stats {
  score: number;
  kills: number;
  deaths: number;
  assists: number;
}

export interface PlayerInGame {
  puuid: string;
  gameName: string;
  tagLine: string;
  teamId: "Blue" | "Red";
  characterId: string;
  stats: Stats;
}

export interface Player {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface MatchList {
  matchId: string;
  gameStartTimeMillis: number;
  queueId: string;
}

export interface Match {
  matchInfo: {
    matchId: string;
    mapId: string;
  };
  teams: [
    { teamId: "Blue" | "Red"; won: boolean },
    { teamId: "Blue" | "Red"; won: boolean }
  ];
  players: PlayerInGame[];
}
