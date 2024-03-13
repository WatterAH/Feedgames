export interface RiotAuth {
  puuid: string;
  gameName: string | null;
  tagLine: string | null;
}

export interface Round {
  roundNum: number;
  playerStats: {
    puuid: string;
    damage: {
      damage: number;
      legshots: number;
      bodyshots: number;
      headshots: number;
    }[];
    economy: { spent: number };
  };
}

export type queueId =
  | "ggteam"
  | "competitive"
  | "unrated"
  | "swiftplay"
  | "spikerush"
  | "";

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

export interface PlayerInGame {
  puuid: string;
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
  puuid: string;
  history: {
    matchId: string;
    gameStartTimeMillis: number;
    queueId: string;
  }[];
}

export interface Match {
  matchInfo: {
    matchId: string;
    mapId: string;
    queueId: queueId;
  };
  teams: [
    { teamId: "Blue" | "Red"; won: boolean; roundsWon: number },
    { teamId: "Blue" | "Red"; won: boolean; roundsWon: number }
  ];
  player: PlayerInGame;
  roundResults: Round[];
}

export interface MatchShowCase {
  gameName: string | null;
  tagLine: string | null;
  mapName: string;
  queueId: string;
  characterId: string;
  playerStats: Stats;
  kda: number;
  roundsWon: number | undefined;
  roundsLoose: number | undefined;
  killsPerRound: number;
  scorePerRound: string;
  damagePerRound: number;
  hsPercentage: string;
  economyRatio: number;
}
