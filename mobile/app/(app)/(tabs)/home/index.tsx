import React, { useEffect, useState } from "react";
import { fetchPosts } from "@/api/post";
import { PostInterface } from "@/interfaces/Post";
import { Loading } from "@/components/Global/Loading";
import { useSession } from "@/context/ctx";
import { SafeAreaView } from "@/components/Global/Themed";
import { PostMap } from "@/components/Post/PostMap";

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
        <PostMap posts={posts} setPosts={setPosts} />
      )}
    </SafeAreaView>
  );
};

export default home;
