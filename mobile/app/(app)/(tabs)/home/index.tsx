import React, { useEffect, useState } from "react";
import { fetchPosts } from "@/api/post";
import { PostInterface } from "@/interfaces/Post";
import { useSession } from "@/context/ctx";
import { SafeAreaView, Text, View } from "@/components/Global/Themed";
import { PostLoader, PostSkeleton } from "@/components/Global/Skeletons";
import { FlatList, RefreshControl, useColorScheme } from "react-native";
import { Post } from "@/components/Post/Post";
import { CheckCircleIcon } from "react-native-heroicons/outline";

const AllDone = () => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#101010";
  return (
    <View className="w-full justify-center items-center h-24 my-5">
      <CheckCircleIcon size={36} color={iconColor} />
      <Text className="text-xl font-bold">Explorador incansable</Text>
      <Text className="text-sm">Has visto todos los posts recientes</Text>
    </View>
  );
};

const home = () => {
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [page, setPage] = useState(0);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);

  const getPosts = async () => {
    try {
      if (!allPostsLoaded) {
        if (page === 0 && !loadingRefresh) setLoading(true);
        if (user?.id) {
          setPage(page + 1);
          const data = await fetchPosts(user.id, page, 10);
          if (data.length > 0) {
            setPosts((prevPosts) => [...prevPosts, ...data]);
          } else {
            setAllPostsLoaded(true);
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingRefresh(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getPosts();
    }
  }, [user?.id]);

  return (
    <SafeAreaView className="h-full flex-col items-center justify-center">
      {loading ? (
        <PostSkeleton />
      ) : (
        <FlatList
          className="flex-col w-full"
          data={posts}
          renderItem={({ item }) => <Post data={item} />}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                setLoadingRefresh(true);
                setPage(0);
                setPosts([]);
                setAllPostsLoaded(false);
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          ListFooterComponent={allPostsLoaded ? <AllDone /> : <PostLoader />}
          onEndReached={getPosts}
          onEndReachedThreshold={0.8}
        ></FlatList>
      )}
    </SafeAreaView>
  );
};

export default home;
