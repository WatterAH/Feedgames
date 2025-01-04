export interface Stats {
  score: number;
  kills: number;
  deaths: number;
  assists: number;
  abilityCasts: {
    grenadeCasts: number;
    ability1Casts: number;
    ability2Casts: number;
    ultimateCasts: number;
  };
}

export interface PlayerStats {
  puuid: string;
  damage: {
    damage: number;
    legshots: number;
    bodyshots: number;
    headshots: number;
  }[];
  economy: { spent: number };
}

export interface Player {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export type queueId =
  | "ggteam"
  | "competitive"
  | "unrated"
  | "swiftplay"
  | "spikerush"
  | "";

export interface PlayerInGame {
  puuid: string;
  teamId: "Blue" | "Red";
  characterId: string;
  stats: Stats;
}

export interface Round {
  roundNum: number;
  playerStats: PlayerStats[];
}

export interface Match {
  matchInfo: {
    matchId: string;
    queueId: queueId;
    mapId: string;
  };
  players: PlayerInGame[];
  teams: [
    { teamId: "Blue" | "Red"; won: boolean; roundsWon: number },
    { teamId: "Blue" | "Red"; won: boolean; roundsWon: number }
  ];
  player: PlayerInGame;
  roundResults: Round[];
}
