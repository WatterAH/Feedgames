import {
  Match,
  MatchShowCase,
  PlayerInGame,
  Round,
} from "../interfaces/Valorant";

export const getKDA = (kills: number, assists: number, deaths: number) => {
  const kd = (kills + assists) / deaths;
  return parseFloat(kd.toFixed(1));
};

export const economyKillsRatio = (
  killsPerRound: number,
  spentPerRound: number
) => {
  const economyRatio = (killsPerRound / spentPerRound) * 1000;
  return parseFloat(economyRatio.toFixed(1));
};

export const hsPercentage = (rounds: Round[]) => {
  let totalShots = 0;
  let totalHs = 0;

  rounds.forEach((round) => {
    const { playerStats } = round;
    const { damage } = playerStats;

    damage.forEach((shot) => {
      totalShots += shot.headshots + shot.bodyshots + shot.legshots;
      totalHs += shot.headshots;
    });
  });

  const hsPercentage = (totalHs / totalShots) * 100;

  return hsPercentage.toFixed(0);
};

export const scorePerRound = (score: number, roundsLength: number) => {
  const averageScore = score / roundsLength;
  return averageScore.toFixed(0);
};

export const spentPerRound = (rounds: Round[]) => {
  const totalSpent = rounds.reduce(
    (acc, cur) => acc + cur.playerStats.economy.spent,
    0
  );
  return totalSpent / rounds.length;
};

export const killsPerRound = (kills: number, rounds: number) => {
  const kills_round = kills / rounds;
  return parseFloat(kills_round.toFixed(1));
};

export const damagePerRound = (rounds: Round[]) => {
  const totalDamage = rounds
    .map((round) =>
      round.playerStats.damage.reduce((acc, cur) => acc + cur.damage, 0)
    )
    .reduce((acc, cur) => acc + cur, 0);

  const damageRound = totalDamage / rounds.length;
  return Number(damageRound.toFixed(1));
};

export const valMatchStats = (match: Match): MatchShowCase => {
  const { matchInfo, player, teams, roundResults } = match.match;
  const { queueId, mapId } = matchInfo;
  const { characterId, stats: playerStats, teamId } = player as PlayerInGame;
  const kills_perRound = killsPerRound(playerStats.kills, roundResults.length);
  const spent_perRound = spentPerRound(roundResults);
  const myTeam = teams.find((team) => team.teamId == teamId);
  const enemyTeam = teams.find((team) => team.teamId !== teamId);

  return {
    mapId,
    characterId,
    queueId: getQueueId(queueId),
    results: `${myTeam?.roundsWon}-${enemyTeam?.roundsWon}`,
    playerStats,
    kda: getKDA(playerStats.kills, playerStats.assists, playerStats.deaths),
    scorePerRound: scorePerRound(playerStats.score, roundResults.length),
    killsPerRound: kills_perRound,
    damagePerRound: damagePerRound(roundResults),
    hsPercentage: hsPercentage(roundResults),
    economyRatio: economyKillsRatio(kills_perRound, spent_perRound),
  };
};

export const getKDAStats = (stats: MatchShowCase["playerStats"]) => {
  return `${stats.kills}/${stats.deaths}/${stats.assists}`;
};

export const getQueueId = (
  queueid: "unrated" | "competitive" | "swiftplay"
) => {
  switch (queueid) {
    case "competitive":
      return "Competitivo";
    case "swiftplay":
      return "Swiftplay";
    case "unrated":
      return "Normal";
  }
};
