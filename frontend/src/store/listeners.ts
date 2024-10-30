import { PostInterface } from "@/interfaces/Post";

export const updatePostInteraction = (
  post: PostInterface,
  type: "like" | "unlike" | "save" | "unsave"
) => {
  switch (type) {
    case "like":
      post.isLiked = true;
      post.liked++;
      break;
    case "unlike":
      post.isLiked = false;
      post.liked--;
      break;
    case "save":
      post.isSaved = true;
      post.saved++;
      break;
    case "unsave":
      post.isSaved = false;
      post.saved--;
      break;
    default:
      break;
  }
};
