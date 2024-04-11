import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { SafeAreaView } from "@/components/Global/Themed";
import { Profile } from "@/components/Profile/Profile";
import { Post } from "@/components/Post/Post";
import { PostInterface } from "@/interfaces/Post";
import { getPostById } from "@/api/post";
import { useSession } from "@/context/ctx";
import { Loading } from "@/components/Global/Loading";

const explore = () => {
  const { user } = useSession();
  const { id, type } = useGlobalSearchParams();
  const [post, setPost] = useState<PostInterface | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "p") {
      if (user?.id) {
        setLoading(true);
        getPostById(id as string, user.id)
          .then((data) => setPost(data))
          .finally(() => setLoading(false));
      }
    }
  }, []);

  return (
    <SafeAreaView className="h-full flex-col items-center justify-center">
      {type === "u" && <Profile id={id as string} />}
      {type === "p" &&
        post?.id &&
        (loading ? <Loading size="large" /> : <Post data={post} />)}
    </SafeAreaView>
  );
};

export default explore;
