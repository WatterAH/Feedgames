import { PostInterface } from "../interfaces/Post";
import { Match } from "../interfaces/Valorant";

export const findMaxItem = function (arr: number[]) {
  const maxItem = Math.max.apply(Math, arr);
  if (maxItem == 0) {
    return -1;
  }
  return arr.indexOf(maxItem);
};

export const joinObjects = function (arrIndex: number[], arr: PostInterface[]) {
  arr = [arr[arrIndex[0]], arr[arrIndex[1]], arr[arrIndex[2]]];
  return arr.filter(function (current) {
    return current != undefined;
  });
};

export const uniques = function (arr: number[]) {
  return arr.filter(function (item, index, arr) {
    return arr.indexOf(item) === index;
  });
};

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
