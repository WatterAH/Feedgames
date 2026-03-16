import { useCallback, useEffect, useState } from "react";
import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
import postRouter from "@/routes/post";
import { getCurrentTerm, getUsers } from "@/routes/search";

export const useExploreResponses = (userId: string, parentId: string) => {
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<PostInterface[]>([]);

  const getResponses = useCallback(async () => {
    if (!userId || !parentId || !hasMore || loading) return;

    try {
      setLoading(true);
      const data = await postRouter.replies(parentId, userId, page, 10);

      setData((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);

      if (data.length < 10) {
        setHasMore(false);
      }
    } catch (_error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [userId, parentId, hasMore, loading, page]);

  useEffect(() => {
    getResponses();
  }, [userId, parentId, getResponses]);

  return { data, loading, error, getResponses };
};

export const useSearchUsers = (
  searchTerm: string,
  setCurrent: React.Dispatch<React.SetStateAction<string>>,
  userId: string | undefined,
) => {
  const [resultsUsers, setResultsUsers] = useState<User[]>([]);
  const [loadUsers, setLoadUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(false);

  useEffect(() => {
    if (searchTerm.trim().length === 0 || !userId) {
      setResultsUsers([]);
      setCurrent("");
      return;
    }

    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim().length > 0) {
        setLoadUsers(true);
        try {
          const users = await getUsers(searchTerm, userId);
          setResultsUsers(users);
        } catch (error: any) {
          setErrorUsers(true);
          throw new Error(error.message);
        } finally {
          setLoadUsers(false);
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, setCurrent, userId]);

  return { resultsUsers, loadUsers, errorUsers };
};

export const useSearchPosts = (term: string, userId: string) => {
  const [resultsPosts, setResultsPosts] = useState<PostInterface[]>([]);
  const [loadPosts, setLoadPosts] = useState(false);
  const [errorPosts, setErrorPosts] = useState(false);

  const getPosts = useCallback(async () => {
    if (term.length === 0 || !userId) {
      return;
    }

    try {
      setLoadPosts(true);
      const posts = await getCurrentTerm(term, userId);
      setResultsPosts(posts);
    } catch (error: any) {
      setErrorPosts(true);
      throw new Error(error.message);
    } finally {
      setLoadPosts(false);
    }
  }, [term, userId]);

  useEffect(() => {
    getPosts();
  }, [term, userId, getPosts]);

  return { resultsPosts, loadPosts, errorPosts };
};
