import { useCallback, useEffect, useState } from "react";
import { getMyLiked, getMySaved } from "@/routes/actions";
import { getTendencyPost } from "@/routes/suggestions";
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
    } catch (error: any) {
      setError(true);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, [userId, type]);

  useEffect(() => {
    getPosts();
  }, [userId, type, getPosts]);

  return { loading, posts, error };
};
