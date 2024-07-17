import React, { useCallback, useMemo } from "react";
import { PostInterface } from "@/interfaces/Post";
import { useSession } from "@/context/ctx";
import { SafeAreaView, Text, View } from "@/components/Global/Themed";
import { PostLoader, PostSkeleton } from "@/components/Global/Skeletons";
import { RefreshControl, useColorScheme } from "react-native";
import { Post } from "@/components/Post/Post";
import { CheckCircleIcon } from "react-native-heroicons/outline";
import { useFeed } from "@/hooks/useFeed";
import Animated from "react-native-reanimated";

export default function home() {
  const { user } = useSession();
  const {
    loading,
    loadingRefresh,
    posts,
    allPostsLoaded,
    refreshPosts,
    getPosts,
  } = useFeed(user?.id);

  const renderItem = useCallback(
    ({ item }: { item: PostInterface }) => <Post data={item} />,
    []
  );
  const keyExtractor = useCallback((item: { id: string }) => item.id, []);
  const ListFooterComponent = useMemo(
    () => (allPostsLoaded ? <AllDone /> : <PostLoader />),
    [allPostsLoaded]
  );

  return (
    <SafeAreaView className="h-full flex-col items-center justify-center">
      {loading ? (
        <PostSkeleton />
      ) : (
        <Animated.FlatList
          className="flex-col w-full"
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={loadingRefresh}
              onRefresh={refreshPosts}
            />
          }
          showsVerticalScrollIndicator={false}
          ListFooterComponent={ListFooterComponent}
          onEndReached={getPosts}
          onEndReachedThreshold={0.8}
          initialNumToRender={10}
        />
      )}
    </SafeAreaView>
  );
}

const AllDone = () => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#101010";

  return (
    <View className="w-full justify-center items-center h-24 my-5">
      <CheckCircleIcon size={36} color={iconColor} />
      <Text className="text-xl font-bold">Explorador incansable</Text>
      <Text className="text-sm">Has visto todos los posts recientes</Text>
    </View>
  );
};
