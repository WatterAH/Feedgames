import { getTendencyPost } from "@/api/post";
import { PostInterface } from "@/interfaces/Post";
import { useCallback, useEffect, useState } from "react";

export const useTendency = (userId: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const getPosts = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await getTendencyPost(userId);
      setPosts(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    getPosts();
  }, [userId]);

  return { loading, posts };
};
