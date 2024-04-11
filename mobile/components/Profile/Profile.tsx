import React, { useEffect, useState } from "react";
import { ScrollView, View } from "../Global/Themed";
import { ProfileDetails } from "./ProfileDetails";
import { ProfilePosts } from "./ProfilePosts";
import { PostInterface } from "@/interfaces/Post";
import { RefreshControl } from "react-native";
import { User } from "@/interfaces/User";
import { useSession } from "@/context/ctx";
import { getProfile, getProfilePost } from "@/api/profile";
import { Loading } from "../Global/Loading";
import { ProfileSkeleton } from "../Global/Skeletons";

interface Props {
  id: string;
}

export const Profile: React.FC<Props> = ({ id }) => {
  const { user: userSession } = useSession();
  const [loadingPage, setLoadingPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const handleProfileViewer = async () => {
    try {
      if (userSession?.id) {
        const dataFetched = await getProfile(id, userSession?.id);
        setUser(dataFetched);
      }
    } catch (error) {}
  };

  const handlePostsViewer = async () => {
    try {
      if (userSession?.id) {
        const postsFetched = await getProfilePost(id, userSession?.id);
        setPosts(postsFetched);
      }
    } catch (error) {}
  };

  const handleViewer = async () => {
    setLoading(true);
    await Promise.all([handleProfileViewer(), handlePostsViewer()]);
    setLoading(false);
  };

  useEffect(() => {
    setLoadingPage(true);
    handleViewer().finally(() => setLoadingPage(false));
  }, []);

  return loadingPage ? (
    <ProfileSkeleton />
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-col gap-y-5 w-full h-full py-2"
    >
      <RefreshControl refreshing={loading} onRefresh={handleViewer} />
      {user?.username && <ProfileDetails data={user} />}
      <View
        style={{ height: 1, width: "100%" }}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ProfilePosts posts={posts} />
    </ScrollView>
  );
};
