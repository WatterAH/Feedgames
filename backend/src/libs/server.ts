import shortUUID from "short-uuid";
import { PostInterface } from "../interfaces/Post";
import { Match, PlayerInGame } from "../interfaces/Valorant";
import { User } from "../interfaces/User";
import { Alert } from "../interfaces/Alert";

const translator = shortUUID();

export const processPost = (post: PostInterface, userId: string) => {
  const { id, liked, saved, content, user, responsed, user_id, ...rest } = post;
  const { followers, id: userIdInPost, ...userRest } = user;

  const userIdParsed = translator.fromUUID(user_id);

  return {
    id: translator.fromUUID(id),
    user_id: userIdParsed,
    user: {
      id: userIdParsed,
      followers: followers.length,
      ...userRest,
    },
    responsed: responsed[0].count,
    content: Array.isArray(content)
      ? {
          type: content[0].type,
          data: content[0].data,
        }
      : content,
    liked: liked.length,
    isLiked: liked.some((like: any) => like.id_user == userId),
    saved: saved.length,
    isSaved: saved.some((save: any) => save.id_user == userId),
    ...rest,
  };
};

export const processMatch = (match: Match) => {
  const { matchInfo, player, teams, roundResults } = match;
  const { queueId, mapId } = matchInfo;
  const { characterId, teamId, stats } = player as PlayerInGame;
  const myTeam = teams.find((team) => team.teamId == teamId);
  const enemyTeam = teams.find((team) => team.teamId !== teamId);

  return {
    preview: {
      kda: `${stats.kills}/${stats.deaths}/${stats.assists}`,
      characterId,
      mapId,
      results: `${myTeam?.roundsWon}-${enemyTeam?.roundsWon}`,
      queueId,
      score: (stats.score / roundResults.length).toFixed(0),
    },
    match,
  };
};

export const processUser = (user: User, requestId: string) => {
  const { id, followers, followed, password, ...rest } = user;

  return {
    id: translator.fromUUID(id),
    follow: followers.some((u: any) => u.id_follower == requestId),
    followers: followers.length,
    followed: followed?.[0]?.count || 0,
    ...rest,
  };
};

export const processAlert = (notify: Alert) => {
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
