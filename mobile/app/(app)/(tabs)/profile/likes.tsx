import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "@/components/Global/Themed";
import { useSession } from "@/context/ctx";
import { PostInterface } from "@/interfaces/Post";
import { getMyLiked } from "@/api/actions";
import { PostSkeleton } from "@/components/Global/Skeletons";
import { FlatList } from "react-native";
import { Post } from "@/components/Post/Post";

const Empty = () => {
  return (
    <Text
      className="text-base text-center max-w-xs"
      style={{ color: "rgb(119, 119, 119)" }}
    >
      Las publicaciones que te gusten aparecerán aquí.
    </Text>
  );
};

const likes = () => {
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const handleLikes = async () => {
    try {
      setLoading(true);
      const data = await getMyLiked(user?.id ?? "0");
      setPosts((prevPosts) => [...prevPosts, ...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLikes();
  }, []);

  return (
    <SafeAreaView className="w-full h-full items-center justify-center">
      {loading ? (
        <PostSkeleton />
      ) : posts.length == 0 ? (
        <Empty></Empty>
      ) : (
        <FlatList
          className="flex-col w-full duration-1000"
          data={posts}
          renderItem={({ item }) => <Post data={item} />}
          ListEmptyComponent={Empty}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default likes;
