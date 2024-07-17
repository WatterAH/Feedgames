import { getProfile, getProfilePost } from "@/api/profile";
import { useSession } from "@/context/ctx";
import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
import { useCallback, useEffect, useState } from "react";

export const useProfile = (userId: string | undefined) => {
  const { user } = useSession();
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loadingPage, setLoadingPage] = useState(false);

  const viewProfile = useCallback(async () => {
    if (!userId || !user?.id) return;
    try {
      const data = await getProfile(userId, user.id);
      setProfile(data);
    } catch (error) {}
  }, [userId, user?.id]);

  const viewPosts = useCallback(async () => {
    if (!userId || !user?.id) return;
    try {
      const data = await getProfilePost(userId, user.id);
      setPosts(data);
    } catch (error) {}
  }, [userId, user?.id]);

  const viewAll = useCallback(async () => {
    await Promise.all([viewProfile(), viewPosts()]);
  }, []);

  useEffect(() => {
    if (user?.id) {
      setLoadingPage(true);
      viewAll().then(() => setLoadingPage(false));
    }
  }, [user?.id]);

  return {
    loadingPage,
    profile,
    posts,
    viewAll,
  };
};
