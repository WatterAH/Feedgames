import React, { useEffect, useState } from "react";
import { Post } from "../components/Post/Post";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../context/AuthContext";
import { LoadingPage } from "../components/LoadingPage";
import { fetchPosts } from "../Api/post";
import { MapPost } from "./MapPost";

export const Feed = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFeed = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts(user.id);
      setPosts((prevPost) => [...prevPost, ...data]);
    } catch (error) {
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
