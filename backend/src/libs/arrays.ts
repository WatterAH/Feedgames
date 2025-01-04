import { Match, PlayerInGame } from "../interfaces/Valorant";

export const filterMatch = (match: Match, puuid: string) => {
  let { matchInfo, players, teams, roundResults } = match;
  let { matchId, queueId, mapId } = matchInfo;

  matchInfo = { matchId, queueId, mapId };

  const player: PlayerInGame = players.find(
    (player) => player.puuid === puuid
  )!;
  const { teamId, characterId, stats } = player;

  const { score, kills, deaths, assists } = stats;
  const partialStats = { score, kills, deaths, assists };

  const partialPlayer = { puuid, teamId, characterId, stats: partialStats };

  const partialRoundResults = roundResults.map((round) => {
    const { roundNum, playerStats } = round;
    const newStats = playerStats.find((stat) => stat.puuid === puuid)!;

    const { damage, economy } = newStats;

    const partialPlayerStats = { damage, economy };
    return { roundNum, playerStats: partialPlayerStats };
  });

  return {
    matchInfo,
    player: partialPlayer,
    teams,
    roundResults: partialRoundResults,
  };
};
