import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { fetchPosts } from "@/api/post";
import { PostInterface } from "@/interfaces/Post";
import Post from "@/components/Post/Post";
import { View, Text } from "@/components/Global/Themed";
import { Search } from "@/components/Search/Search";

const MapPost = ({
  posts,
  setPosts,
}: {
  posts: PostInterface[];
  setPosts: React.Dispatch<React.SetStateAction<PostInterface[]>>;
}) => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = React.useCallback(() => {
    setLoading(true);
    fetchPosts("6f74216e-6730-4064-9685-0e9672c9ffa4")
      .then((data) => {
        if (data) {
          setPosts(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        padding: 24,
        rowGap: 5,
      }}
    >
      <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
      {posts.map((post) => (
        <Post data={post} key={post.id} />
      ))}
    </ScrollView>
  );
};

const home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchPosts("6f74216e-6730-4064-9685-0e9672c9ffa4")
      .then((data) => {
        if (data) {
          setPosts((prevPosts) => [...prevPosts, ...data]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <Text>Cargando...</Text>
  ) : (
    <View
      darkColor="rgb(0, 0, 0)"
      lightColor="#eee"
      className="h-fit flex flex-col items-center justify-center mt-10"
    >
      {/* <Search /> */}
      <MapPost posts={posts} setPosts={setPosts} />
    </View>
  );
};

export default home;
