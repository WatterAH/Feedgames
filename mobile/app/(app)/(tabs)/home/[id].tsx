import React, { useEffect, useState } from "react";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Text, View } from "@/components/Global/Themed";
import { PostInterface, defaultPost } from "@/interfaces/Post";
import { getPostById } from "@/api/post";
import Post from "@/components/Post/Post";

const ExplorePost = () => {
  const { id } = useGlobalSearchParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostInterface>(defaultPost);

  const getPost = async () => {
    try {
      setLoading(true);
      const postFetched = await getPostById(
        id as string,
        "6f74216e-6730-4064-9685-0e9672c9ffa4"
      );
      setPost(postFetched as PostInterface);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  return (
    <View className="flex items-center justify-center h-full py-2 px-3">
      <Stack.Screen options={{ headerTitle: "Post" }} />
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <View className="max-w-2xl w-full mx-auto h-full">
          <Post data={post as PostInterface} />
        </View>
      )}
    </View>
  );
};

export default ExplorePost;
