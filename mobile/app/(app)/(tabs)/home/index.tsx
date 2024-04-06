import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { fetchPosts } from "@/api/post";
import { PostInterface } from "@/interfaces/Post";
import Post from "@/components/Post/Post";
import { Loading } from "@/components/Global/Loading";
import { useSession } from "@/context/ctx";
import { SafeAreaView } from "@/components/Global/Themed";

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
    <ScrollView className="flex-col w-full h-full">
      <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
      {posts.map((post) => (
        <Post data={post} key={post.id} />
      ))}
    </ScrollView>
  );
};

const home = () => {
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    setLoading(true);
    if (user?.id) {
      fetchPosts(user.id)
        .then((data) => {
          if (data) {
            setPosts((prevPosts) => [...prevPosts, ...data]);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  return (
    <SafeAreaView className="h-full flex-col items-center justify-center">
      {loading ? (
        <Loading size="large" />
      ) : (
        <MapPost posts={posts} setPosts={setPosts} />
      )}
    </SafeAreaView>
  );
};

export default home;
