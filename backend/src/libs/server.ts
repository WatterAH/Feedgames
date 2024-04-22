import { PostInterface } from "../interfaces/Post";

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
