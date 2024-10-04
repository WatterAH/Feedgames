import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/context/AuthContext";
import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
import { getProfile, getProfilePost } from "@/routes/profile";
import { CommentInterface } from "@/interfaces/Comment";
import { getPostById } from "@/routes/post";
import { fetchComments } from "@/routes/comments";

export const useExploreProfile = (userId: string | undefined) => {
  const { user } = useUser();
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const profileData = useCallback(async () => {
    if (!userId || !user?.id) return;
    try {
      const data = await getProfile(userId, user.id);
      setProfile(data);
    } catch (error: any) {
      setError(true);
      throw new Error(error.message);
    }
  }, [userId, user.id]);

  const profilePosts = useCallback(async () => {
    if (!userId || !user?.id) return;
    try {
      const data = await getProfilePost(userId, user.id);
      setPosts(data);
    } catch (error: any) {
      setError(true);
      throw new Error(error.message);
    }
  }, [userId, user.id]);

  const loadProfile = useCallback(async () => {
    await Promise.all([profileData(), profilePosts()]);
  }, [profileData, profilePosts]);

  useEffect(() => {
    setLoading(true);
    loadProfile().then(() => setLoading(false));
  }, [user.id, userId, loadProfile]);

  return { profile, posts, loading, error };
};

export const useExplorePost = (
  postId: string | undefined,
  userId: string | undefined
) => {
  const [post, setPost] = useState<PostInterface | null>();
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPost = useCallback(async () => {
    if (!postId || !userId) return;
    try {
      const data = await getPostById(postId, userId);
      setPost(data);
    } catch (error: any) {
      setError(true);
      throw new Error(error.message);
    }
  }, [postId, userId]);

  const getComments = useCallback(async () => {
    if (!postId || !userId) return;
    try {
      const data = await fetchComments(postId, userId);
      setComments(data);
    } catch (error: any) {
      setError(true);
      throw new Error(error.message);
    }
  }, [postId, userId]);

  useEffect(() => {
    setLoading(true);
    Promise.all([getPost(), getComments()]).then(() => setLoading(false));
  }, [getPost, getComments]);

  return { post, comments, loading, error };
};
