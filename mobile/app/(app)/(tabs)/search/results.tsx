import { PostLoader } from "@/components/Global/Skeletons";
import { SafeAreaView, Text, View } from "@/components/Global/Themed";
import { Post } from "@/components/Post/Post";
import { useSession } from "@/context/ctx";
import { useSearch } from "@/hooks/useSearch";
import { PostInterface } from "@/interfaces/Post";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { FlatList } from "react-native";

export default function results() {
  const { searchTerm } = useLocalSearchParams<{ searchTerm: string }>();
  const { user } = useSession();
  const { loading, posts } = useSearch(user?.id, "post", searchTerm);
  const renderItem = useCallback(
    ({ item }: { item: PostInterface }) => <Post data={item} />,
    []
  );
  const keyExtractor = useCallback((item: { id: string }) => item.id, []);

  return (
    <SafeAreaView className="flex-1">
      <View className=" flex-row items-center border-b border-light-gray dark:border-dark-gray h-12 w-full">
        <Text className="text-xl pl-4 pr-2 font-bold">
          Resultados para "{searchTerm}"
        </Text>
        <Text className="text-gray-uni">{posts.length}</Text>
      </View>
      {loading ? (
        <View className="mt-4">
          <PostLoader />
          <PostLoader />
          <PostLoader />
          <PostLoader />
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </SafeAreaView>
  );
}
