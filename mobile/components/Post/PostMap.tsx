import React, { useState } from "react";
import { PostInterface } from "@/interfaces/Post";
import { FlatList, RefreshControl } from "react-native";
import { Post } from "./Post";

interface Props {
  posts: PostInterface[];
  handleRefresh: () => Promise<void>;
}

export const PostMap: React.FC<Props> = ({ posts, handleRefresh }) => {
  const [loading, setLoading] = useState(false);

  const setLoadState = async () => {
    setLoading(true);
    await handleRefresh();
    setLoading(false);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={setLoadState} />
      }
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Post data={item} />}
      className="flex-col w-full h-full duration-1000"
    ></FlatList>
  );
};
