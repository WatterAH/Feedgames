import { useCallback, useEffect, useState } from "react";
import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
import { getProfile } from "@/routes/profile";
import { getPostById, getResponsesByParentId } from "@/routes/post";
import { getCurrentTerm, getUsers } from "@/routes/search";

export const useExploreProfile = (userId: string, requestId: string) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const profileData = useCallback(async () => {
    if (!userId || !requestId) return;
    try {
      setLoading(true);
      const data = await getProfile(userId, requestId);
      setProfile(data);
    } catch (error: any) {
      setError(true);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, [userId, requestId]);

  useEffect(() => {
    profileData();
  }, [requestId, userId, profileData]);

  return { profile, loading, error };
};

export const useExploreResponses = (userId: string, parentId: string) => {
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [responses, setResponses] = useState<PostInterface[]>([]);

  const getResponses = async () => {
    if (!userId || !parentId || !hasMore || loading) return;

    try {
      setLoading(true);
      const data = await getResponsesByParentId(parentId, userId, page, 10);

      setResponses((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);

      if (data.length < 10) {
        setHasMore(false);
      }
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResponses();
  }, [userId, parentId]);

  return { responses, loading, error, getResponses };
};

export const useFetchPost = (
  postId: string | undefined,
  userId: string | undefined,
  fetchPost: boolean
) => {
  const [post, setPost] = useState<PostInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPost = useCallback(async () => {
    if (!postId || !userId || !fetchPost) return;

    try {
      setLoading(true);
      const data = await getPostById(postId, userId);
      setPost(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [postId, userId]);

  useEffect(() => {
    if (userId) getPost();
  }, [getPost, userId]);

  return { fetchedPost: post, loading, error };
};

export const useSearchUsers = (
  searchTerm: string,
  setCurrent: React.Dispatch<React.SetStateAction<string>>,
  userId: string | undefined
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
