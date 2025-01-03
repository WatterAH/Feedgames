import { useCallback, useEffect, useState } from "react";
import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
import { getProfile } from "@/routes/profile";
import { getPostById } from "@/routes/post";
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

export const useExplorePost = (
  postId: string | undefined,
  userId: string | undefined
) => {
  const [post, setPost] = useState<PostInterface | null>();
  const [responses, setResponses] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPost = useCallback(async () => {
    if (!postId || !userId) return;
    try {
      setLoading(true);
      const data = await getPostById(postId, userId);
      const { post, responses } = data;
      setPost(post);
      setResponses(responses);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [postId, userId]);

  useEffect(() => {
    if (userId) getPost();
  }, [getPost, userId]);

  return { post, responses, loading, error };
};

export const useSearchUsers = (
  searchTerm: string,
  setCurrent: React.Dispatch<React.SetStateAction<string>>
) => {
  const [resultsUsers, setResultsUsers] = useState<User[]>([]);
  const [loadUsers, setLoadUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(false);

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setResultsUsers([]);
      setCurrent("");
    }

    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim().length > 0) {
        setLoadUsers(true);
        try {
          const users = await getUsers(searchTerm);
          setResultsUsers(users);
        } catch (error) {
          setErrorUsers(true);
        } finally {
          setLoadUsers(false);
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return { resultsUsers, loadUsers, errorUsers };
};

export const useSearchPosts = (term: string, userId: string) => {
  const [resultsPosts, setResultsPosts] = useState<PostInterface[]>([]);
  const [loadPosts, setLoadPosts] = useState(false);
  const [errorPosts, setErrorPosts] = useState(false);

  const getPosts = async () => {
    if (term.length === 0 || !userId) {
      return;
    }

    try {
      setLoadPosts(true);
      const posts = await getCurrentTerm(term, userId);
      setResultsPosts(posts);
    } catch (error) {
      setErrorPosts(true);
    } finally {
      setLoadPosts(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [term, userId]);

  return { resultsPosts, loadPosts, errorPosts };
};
