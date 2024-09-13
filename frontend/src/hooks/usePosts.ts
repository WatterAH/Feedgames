import { useCallback, useEffect, useState } from "react";
import { getMyLiked, getMySaved } from "../Api/actions";
import { getTendencyPost } from "../Api/suggestions";
import { PostInterface } from "../interfaces/Post";

type type = "saved" | "liked" | "tendency";

const functionTypes = {
  saved: getMySaved,
  liked: getMyLiked,
  tendency: getTendencyPost,
};

export const usePosts = (userId: string | undefined, type: type) => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPosts = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await functionTypes[type](userId);
      setPosts(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [userId, type]);

  useEffect(() => {
    getPosts();
  }, [userId, type]);

  return { loading, posts, error };
};
