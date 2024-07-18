import React, { useCallback, useState } from "react";
import { PostLoader, PostSkeleton } from "@/components/Global/Skeletons";
import { SafeAreaView, ScrollView, View } from "@/components/Global/Themed";
import { ProfileDetails } from "@/components/Profile/ProfileDetails";
import { ProfilePosts } from "@/components/Profile/ProfilePosts";
import { useSession } from "@/context/ctx";
import { useProfile } from "@/hooks/useProfile";
import { RefreshControl } from "react-native";

export default function profile() {
  const { user } = useSession();
  const { loadingPage, posts, viewAll } = useProfile(user?.id);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setLoading(true);
    viewAll().then(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        className="flex-col gap-y-5 w-full h-full py-2"
        showsVerticalScrollIndicator={false}
      >
        <RefreshControl refreshing={loading} onRefresh={refresh} />
        {user?.name && <ProfileDetails data={user} />}
        <View
          style={{ height: 1, width: "100%" }}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {loadingPage ? (
          <View className="mt-3">
            <PostSkeleton />
          </View>
        ) : (
          <ProfilePosts posts={posts} name={user?.name} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
