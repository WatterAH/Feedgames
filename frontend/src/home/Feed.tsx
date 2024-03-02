import React, { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";
import { fetchPosts } from "../Api/post";
import { MapPost } from "./MapPost";
import { PostInterface } from "../interfaces/Post";
import { ErrorPage } from "../components/ErrorPage";

export const Feed = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleFeed = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts(user.id);
      setPosts((prevPost) => [...prevPost, ...data]);
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      handleFeed();
    }
  }, [user.id]);

  return error ? (
    <ErrorPage />
  ) : (
    <MapPost posts={posts} loading={loading} setPosts={setPosts} />
  );
};
