import React, { useState } from "react";
import { PostInterface } from "@/interfaces/Post";
import { fetchPosts } from "@/api/post";
import { RefreshControl, ScrollView } from "react-native";
import { Post } from "./Post";

interface Props {
  posts: PostInterface[];
  setPosts: React.Dispatch<React.SetStateAction<PostInterface[]>>;
}

export const PostMap: React.FC<Props> = ({ posts, setPosts }) => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    fetchPosts("6f74216e-6730-4064-9685-0e9672c9ffa4")
      .then((data) => {
        if (data) {
          setPosts(data);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView className="flex-col w-full h-full">
      <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
      {posts.map((post) => (
        <Post data={post} key={post.id} />
      ))}
    </ScrollView>
  );
};
