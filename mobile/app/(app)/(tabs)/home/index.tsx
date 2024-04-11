import React, { useEffect, useState } from "react";
import { fetchPosts } from "@/api/post";
import { PostInterface } from "@/interfaces/Post";
import { useSession } from "@/context/ctx";
import { SafeAreaView } from "@/components/Global/Themed";
import { PostMap } from "@/components/Post/PostMap";
import { PostSkeleton } from "@/components/Global/Skeletons";

const home = () => {
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const getPosts = async () => {
    if (user?.id) {
      const data = await fetchPosts(user.id);
      setPosts(data);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPosts().then(() => setLoading(false));
  }, [user?.id]);

  return (
    <SafeAreaView className="h-full flex-col items-center justify-center">
      {loading ? (
        <PostSkeleton />
      ) : (
        <PostMap posts={posts} handleRefresh={getPosts} />
      )}
    </SafeAreaView>
  );
};

export default home;
