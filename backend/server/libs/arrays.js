/**
 * Encuentra el índice del elemento máximo en un array.
 * @param arr Array de números.
 * @returns El índice del elemento máximo o -1 si el array está vacío.
 */
export const findMaxItem = function (arr) {
  const maxItem = Math.max.apply(Math, arr);
  if (maxItem == 0) {
    return -1;
  }
  return arr.indexOf(maxItem);
};
/**
 * Une objetos de un array según los índices proporcionados.
 * @param arrIndex Índices de los objetos a unir.
 * @param arr Array de objetos.
 * @returns Array de objetos unidos.
 */
export const joinObjects = function (arrIndex, arr) {
  arr = [arr[arrIndex[0]], arr[arrIndex[1]], arr[arrIndex[2]]];
  return arr.filter(function (current) {
    return current != undefined;
  });
};
/**
 * Filtra los elementos únicos de un array.
 * @param arr Array de elementos.
 * @returns Array con elementos únicos.
 */
export const uniques = function (arr) {
  return arr.filter(function (item, index, arr) {
    return arr.indexOf(item) === index;
  });
};

export const filterMatch = (match, puuid) => {
  let { matchInfo, players, teams, roundResults } = match;
  let { matchId, mapId, queueId } = matchInfo;
  matchInfo = { matchId, mapId, queueId };
  let player = players.find((player) => player.puuid == puuid);
  let { teamId, characterId, stats } = player;
  let { score, kills, deaths, assists, abilityCasts } = stats;
  stats = { score, kills, deaths, assists, abilityCasts };
  player = { puuid, teamId, characterId, stats };
  roundResults = roundResults.map((round) => {
    let { roundNum, playerStats } = round;
    playerStats = playerStats.find((stat) => stat.puuid == puuid);
    let { damage, economy } = playerStats;
    playerStats = { damage, economy };
    return { roundNum, playerStats };
  });
  return { matchInfo, player, teams, roundResults };
};
