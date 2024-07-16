import React, { useEffect, useState } from "react";
import { ProfileSkeleton } from "@/components/Global/Skeletons";
import { SafeAreaView, ScrollView, View } from "@/components/Global/Themed";
import { ProfileDetails } from "@/components/Profile/ProfileDetails";
import { ProfilePosts } from "@/components/Profile/ProfilePosts";
import { useProfile } from "@/hooks/useProfile";
import { RefreshControl } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function profile() {
  const { id } = useLocalSearchParams();
  const { loading, profile, posts, viewAll } = useProfile(id as string);
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    viewAll().then(() => setLoadingPage(false));
  }, []);

  return (
    <SafeAreaView>
      {loadingPage ? (
        <ProfileSkeleton />
      ) : (
        <ScrollView
          className="flex-col gap-y-5 w-full h-full py-2"
          showsVerticalScrollIndicator={false}
        >
          <RefreshControl refreshing={loading} onRefresh={viewAll} />
          {profile?.name && <ProfileDetails data={profile} />}
          <View
            style={{ height: 1, width: "100%" }}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <ProfilePosts posts={posts} name={profile?.name} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
