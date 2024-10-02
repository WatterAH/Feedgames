import { useCallback, useEffect, useState } from "react";
import { PostInterface } from "../interfaces/Post";
import { fetchPosts } from "@/routes/post";

export const useFeed = (userId: string) => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const getPosts = useCallback(async () => {
    if (!userId || allLoaded) return;

    try {
      if (page == 0) setLoading(true);
      const data = await fetchPosts(userId, page, 10);
      if (data.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setPage((prev) => prev + 1);
      } else {
        setAllLoaded(true);
      }
    } catch (error: any) {
      setError(true);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, [userId, page, allLoaded]);

  useEffect(() => {
    if (page == 0) getPosts();
  }, [userId, getPosts, page]);

  return { posts, loading, error, getPosts, allLoaded };
};
