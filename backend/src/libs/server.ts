import shortUUID from "short-uuid";
import { PostInterface } from "../interfaces/Post";
import { Match, PlayerInGame } from "../interfaces/Valorant";
import { Comment } from "../interfaces/Comment";

const translator = shortUUID();

export const processPost = (post: PostInterface | any, userId: string) => {
  const { id, liked, saved, comments, user, user_id, ...rest } = post;
  const { followers, ...userRest } = user;
  const isLiked = liked.some((like: any) => like.id_user == userId);
  const isSaved = saved.some((save: any) => save.id_user == userId);
  const isCommented = comments.some(
    (comment: any) => comment.id_user == userId
  );
  return {
    id: translator.fromUUID(id),
    user_id: translator.fromUUID(user_id),
    user: {
      followers: followers[0].count,
      ...userRest,
    },
    liked: liked.length,
    isLiked,
    saved: saved.length,
    isSaved,
    comments: comments.length,
    isCommented,
    ...rest,
  };
};

export const processComment = (comment: Comment | any, userId: string) => {
  const { id, comments_liked, ...rest } = comment;
  const isLiked = comments_liked.some((like: any) => like.id_user == userId);
  return {
    ...rest,
    id: translator.fromUUID(id),
    liked: comments_liked.length,
    isLiked,
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
  const { id, followers, followed, ...rest } = user;
  const follow = followers.some((u: any) => u.id_follower == userId);

  return {
    id: translator.fromUUID(id),
    follow: follow,
    followers: followers.length,
    followed: followed[0].count,
    ...rest,
  };
};

export const processNotify = (notify: any) => {
  const { user, ...rest } = notify;
  const { id, ...userRest } = user;
  return {
    user: {
      id: translator.fromUUID(id),
      ...userRest,
    },
    ...rest,
  };
};
