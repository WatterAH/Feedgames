import { PostInterface } from "@/interfaces/Post";
import { likedPosts, savedPosts } from "@/routes/post";
import { profilePosts } from "@/routes/profile";
import { getTendencyPost } from "@/routes/suggestions";
import { useCallback, useEffect, useState } from "react";

type Type = "profile" | "liked" | "saved";

const functions = {
  profile: profilePosts,
  liked: likedPosts,
  saved: savedPosts,
};

export const usePosts = (userId: string, type: Type, requestId?: string) => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = useCallback(async () => {
    if (!userId || !hasMore) return;
    try {
      if (page == 0) setLoading(true);
      const data = await functions[type](
        userId,
        page,
        10,
        type === "profile" ? requestId : undefined
      );
      if (data.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [userId, page, hasMore, type, requestId]);

  useEffect(() => {
    if (page == 0) getPosts();
  }, [userId, page, getPosts, type]);

  return { posts, loading, error, hasMore, getPosts };
};

export const useTendencyPost = (userId: string) => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPosts = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await getTendencyPost(userId);
      setPosts(data);
    } catch (error: any) {
      setError(true);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    getPosts();
  }, [userId, getPosts]);

  return { loading, posts, error };
};
