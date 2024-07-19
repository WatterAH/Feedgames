import React, { useCallback } from "react";
import { PostSkeleton } from "@/components/Global/Skeletons";
import { SafeAreaView, View } from "@/components/Global/Themed";
import { Post } from "@/components/Post/Post";
import { useSession } from "@/context/ctx";
import { FlatList, RefreshControl } from "react-native";
import { usePosts } from "@/hooks/usePosts";
import { Empty } from "@/components/Global/Empty";
import { PostInterface } from "@/interfaces/Post";

export default function saves() {
  const { user } = useSession();
  const { loading, reloading, posts, reload } = usePosts(user?.id, "saved");
  const renderItem = useCallback(
    ({ item }: { item: PostInterface }) => <Post data={item} />,
    []
  );
  const keyExtractor = useCallback((item: { id: string }) => item.id, []);

  return (
    <SafeAreaView className="flex items-center justify-center">
      {loading && !reloading ? (
        <PostSkeleton />
      ) : posts.length == 0 ? (
        <View className="flex h-full items-center justify-center">
          <Empty text="Las publicaciones que guardes aparecerán aquí." />
        </View>
      ) : (
        <FlatList
          className="flex flex-col h-full w-full duration-1000"
          data={posts}
          refreshControl={
            <RefreshControl refreshing={reloading} onRefresh={reload} />
          }
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
