import { useEffect, useState } from "react";
import { PostInterface } from "../interfaces/Post";
import { fetchPosts } from "../Api/post";

export const useFeed = (userId: string | undefined, page: number) => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const getPosts = async () => {
    if (!userId || allLoaded) return;
    try {
      if (page == 0) setLoading(true);
      const data = await fetchPosts(userId, page, 10);
      if (data.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data]);
      } else {
        setAllLoaded(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  return { posts, loading, error };
};
