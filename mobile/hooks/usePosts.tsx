import { getMyLiked, getMySaved, searchPost } from "@/api/actions";
import { getTendencyPost } from "@/api/post";
import { PostInterface } from "@/interfaces/Post";
import { useCallback, useEffect, useState } from "react";

type type = "saved" | "liked" | "tendency";

const functionTypes = {
  saved: getMySaved,
  liked: getMyLiked,
  tendency: getTendencyPost,
};

export const usePosts = (userId: string | undefined, type: type) => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [reloading, setRealoading] = useState(false);

  const getPosts = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await functionTypes[type](userId);
      setPosts(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [userId, type]);

  const reload = useCallback(async () => {
    setRealoading(true);
    await getPosts();
    setRealoading(false);
  }, []);

  useEffect(() => {
    getPosts();
  }, [userId, type]);

  return { loading, reloading, posts, reload };
};
