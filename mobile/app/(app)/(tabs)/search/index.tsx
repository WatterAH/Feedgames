import React, { useCallback, useEffect, useState } from "react";
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
import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
import { searchUser } from "@/api/actions";
import { Result } from "@/components/Search/Result";
import { SearchIn } from "@/components/Search/SearchIn";

const index = () => {
  const { user } = useSession();
  const { loading, reloading, posts, reload } = usePosts(user?.id, "tendency");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [focus, setFocus] = useState(false);

  const renderItem = useCallback(
    ({ item }: { item: PostInterface }) => <Post data={item} />,
    []
  );
  const keyExtractor = useCallback((item: { id: string }) => item.id, []);

  const handleSearch = async () => {
    try {
      const data = await searchUser(searchTerm);
      setResults(data);
    } catch (error) {}
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <SafeAreaView className="flex-1">
      <InputSearch
        text={searchTerm}
        focus={focus}
        setFocus={setFocus}
        setText={setSearchTerm}
      />
      {loading && !reloading ? (
        <View className="mt-4">
          <PostLoader />
          <PostLoader />
          <PostLoader />
          <PostLoader />
        </View>
      ) : searchTerm ? (
        <FlatList
          data={results}
          ListHeaderComponent={<SearchIn searchTerm={searchTerm} />}
          renderItem={({ item }) => <Result data={item} />}
        />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={
            <Text className="text-xl px-4 pt-3 font-bold">En tendencia</Text>
          }
          refreshControl={
            <RefreshControl refreshing={reloading} onRefresh={reload} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default index;
