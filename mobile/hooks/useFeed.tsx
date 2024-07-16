import { fetchPosts } from "@/api/post";
import { PostInterface } from "@/interfaces/Post";
import { useCallback, useEffect, useState } from "react";

export const useFeed = (userId: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [page, setPage] = useState(0);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);

  const getPosts = useCallback(async () => {
    try {
      if (!userId || allPostsLoaded) return;
      if (page === 0 && !loadingRefresh) setLoading(true);
      setPage((prevPage) => prevPage + 1);
      const data = await fetchPosts(userId, page, 10);
      if (data.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data]);
      } else {
        setAllPostsLoaded(true);
      }
    } catch (error) {
      //TODO: Manejo de error
    } finally {
      setLoading(false);
      setLoadingRefresh(false);
    }
  }, [userId, page]);

  const refreshPosts = useCallback(() => {
    setLoadingRefresh(true);
    setPage(0);
    setPosts([]);
    setAllPostsLoaded(false);
  }, []);

  useEffect(() => {
    if (userId) getPosts();
  }, [userId]);

  return {
    loading,
    loadingRefresh,
    posts,
    allPostsLoaded,
    refreshPosts,
    getPosts,
  };
};
