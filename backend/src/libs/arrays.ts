import { Match } from "../interfaces/Valorant";

export const filterMatch = (match: Match, puuid: string) => {
  let { matchInfo, players, teams, roundResults } = match;
  let { matchId, mapId, queueId } = matchInfo;
  matchInfo = { matchId, mapId, queueId };
  let player: any = players.find((player) => player.puuid == puuid);
  let { teamId, characterId, stats } = player;
  let { score, kills, deaths, assists } = stats;
  stats = { score, kills, deaths, assists };
  player = { puuid, teamId, characterId, stats };
  roundResults = roundResults.map((round) => {
    let { roundNum, playerStats } = round;
    // @ts-ignore
    playerStats = playerStats.find((stat) => stat.puuid == puuid);
    // @ts-ignore
    let { damage, economy } = playerStats;
    // @ts-ignore
    playerStats = { damage, economy };
    return { roundNum, playerStats };
  });
  return { matchInfo, player, teams, roundResults };
};
