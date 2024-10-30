import shortUUID from "short-uuid";
import { PostInterface } from "../interfaces/Post";
import { Match, PlayerInGame } from "../interfaces/Valorant";
import { Comment } from "../interfaces/Comment";

const translator = shortUUID();

export const processPost = (post: PostInterface | any, userId: string) => {
  const { id, liked, saved, comments, user, user_id, ...rest } = post;
  const { followers, id: userIdInPost, ...userRest } = user;
  const isLiked = liked.some((like: any) => like.id_user == userId);
  const isSaved = saved.some((save: any) => save.id_user == userId);

  const userIdParsed = translator.fromUUID(user_id);

  return {
    id: translator.fromUUID(id),
    user_id: userIdParsed,
    user: {
      id: userIdParsed,
      followers: followers[0].count,
      ...userRest,
    },
    liked: liked.length,
    isLiked,
    saved: saved.length,
    isSaved,
    comments: comments.length,
    ...rest,
  };
};

export const processComment = (
  comment: Comment | any,
  userId: string
): Comment => {
  const {
    id,
    id_user: authorId,
    id_post: postId,
    comments_liked: likes,
    user: { id: userIdInPost, followers, ...userDetails },
    ...otherDetails
  } = comment;

  const isLiked = likes.some((like: any) => like.id_user === userId);

  return {
    id: translator.fromUUID(id),
    id_user: translator.fromUUID(authorId),
    id_post: translator.fromUUID(postId),
    liked: likes.length,
    isLiked,
    user: {
      id: translator.fromUUID(userIdInPost),
      followers: followers[0].count,
      ...userDetails,
    },
    ...otherDetails,
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
