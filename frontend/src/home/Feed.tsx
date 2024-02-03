import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../context/AuthContext";
import { fetchPosts } from "../Api/post";
import { MapPost } from "./MapPost";
import { PostInterface } from "../interfaces/Post";

export const Feed = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFeed = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts(user.id);
      setPosts((prevPost) => [...prevPost, ...data]);
    } catch (error: any) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      handleFeed();
    }
  }, [user.id]);

  return (
    <>
      <MapPost posts={posts} loading={loading} />
      <ToastContainer />
    </>
  );
};
