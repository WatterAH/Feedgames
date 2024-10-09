import { PostInterface } from "../interfaces/Post";
import { Match, PlayerInGame } from "../interfaces/Valorant";

export const processPost = (post: PostInterface, userId: string) => {
  const { liked, saved, comments, ...rest } = post;
  const isLiked = liked.some((like) => like.id_user == userId);
  const isSaved = saved.some((save) => save.id_user == userId);
  const isCommented = comments.some((comment) => comment.id_user == userId);
  return {
    ...rest,
    liked: liked.length,
    isLiked,
    saved: saved.length,
    isSaved,
    comments: comments.length,
    isCommented,
  };
};

export const processMatch = (match: Match) => {
  const { matchInfo, player, teams } = match;
  const { queueId } = matchInfo;
  const { characterId, teamId, stats } = player as PlayerInGame;
  const myTeam = teams.find((team) => team.teamId == teamId);
  const enemyTeam = teams.find((team) => team.teamId !== teamId);

  return {
    preview: {
      kda: `${stats.kills}/${stats.deaths}/${stats.assists}`,
      characterId,
      results: `${myTeam?.roundsWon}:${enemyTeam?.roundsWon} `,
      queueId,
      won: myTeam?.won,
    },
    match,
  };
};
