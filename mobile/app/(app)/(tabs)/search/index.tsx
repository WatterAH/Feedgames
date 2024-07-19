import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "@/components/Global/Themed";
import { InputSearch } from "@/components/Search/InputSearch";
import { useSession } from "@/context/ctx";
import { Post } from "@/components/Post/Post";
import { PostLoader } from "@/components/Global/Skeletons";
import { usePosts } from "@/hooks/usePosts";
import { FlatList, RefreshControl } from "react-native";

const index = () => {
  const { user } = useSession();
  const { loading, reloading, posts, reload } = usePosts(user?.id, "tendency");

  return (
    <SafeAreaView>
      <InputSearch />
      <Text className="text-xl px-4 pt-3 font-bold">En tendencia</Text>
      {loading && !reloading ? (
        <View className="mt-4">
          <PostLoader />
          <PostLoader />
          <PostLoader />
          <PostLoader />
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => <Post data={item} />}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={reloading} onRefresh={reload} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default index;
