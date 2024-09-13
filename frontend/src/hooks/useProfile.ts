import { useCallback, useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";
import { User } from "../interfaces/User";
import { PostInterface } from "../interfaces/Post";
import { getProfile, getProfilePost } from "../Api/profile";

export const useProfile = (userId: string | undefined) => {
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
    } catch (error) {
      setError(true);
    }
  }, [userId, user.id]);

  const profilePosts = useCallback(async () => {
    if (!userId || !user?.id) return;
    try {
      const data = await getProfilePost(userId, user.id);
      setPosts(data);
    } catch (error) {
      setError(true);
    }
  }, [userId, user.id]);

  const loadProfile = useCallback(async () => {
    await Promise.all([profileData(), profilePosts()]);
  }, [profileData, profilePosts]);

  useEffect(() => {
    setLoading(true);
    loadProfile().then(() => setLoading(false));
  }, [user.id, userId]);

  return { profile, posts, loading, error };
};
