import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "@/components/Global/Themed";
import { InputSearch } from "@/components/Search/InputSearch";
import { useTendency } from "@/hooks/useTendency";
import { useSession } from "@/context/ctx";
import { Post } from "@/components/Post/Post";
import { PostLoader } from "@/components/Global/Skeletons";

const index = () => {
  const { user } = useSession();
  const { loading, posts } = useTendency(user?.id);

  return (
    <SafeAreaView>
      <ScrollView
        className="flex-col h-full w-full"
        showsVerticalScrollIndicator={false}
      >
        <InputSearch />
        <Text className="text-xl px-4 pt-3 font-bold">En tendencia</Text>
        {loading ? (
          <View className="mt-4">
            <PostLoader />
            <PostLoader />
            <PostLoader />
            <PostLoader />
          </View>
        ) : (
          posts.map((post) => <Post data={post} key={post.id} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
