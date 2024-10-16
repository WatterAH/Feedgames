import { PostInterface } from "@/interfaces/Post";
import { getPostsByUser, likedPosts, savedPosts } from "@/routes/post";
import { useCallback, useEffect, useState } from "react";

type Type = "profile" | "liked" | "saved";

const functions = {
  profile: getPostsByUser,
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
