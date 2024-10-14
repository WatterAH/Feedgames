import { PostInterface } from "../interfaces/Post";
import { Match, PlayerInGame } from "../interfaces/Valorant";

export const processPost = (post: PostInterface | any, userId: string) => {
  const { liked, saved, comments, user, ...rest } = post;
  const { followers, ...userRest } = user;
  const isLiked = liked.some((like: any) => like.id_user == userId);
  const isSaved = saved.some((save: any) => save.id_user == userId);
  const isCommented = comments.some(
    (comment: any) => comment.id_user == userId
  );
  return {
    ...rest,
    user: {
      ...userRest,
      followers: followers[0].count,
    },
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

export const processUser = (user: any, userId: string) => {
  const { followers, followed, ...rest } = user;
  const follow = followers.some((u: any) => u.id_follower == userId);

  return {
    ...rest,
    follow: follow,
    followers: followers.length,
    followed: followed[0].count,
  };
};
