import { useCallback, useEffect, useState } from "react";
import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
import { getProfile } from "@/routes/profile";
import { getPostById } from "@/routes/post";

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
