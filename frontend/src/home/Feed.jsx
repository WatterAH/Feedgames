import React, { useEffect, useState } from "react";
import { Post } from "../components/Post/Post";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../context/AuthContext";
import { LoadingPage } from "../components/LoadingPage";
import { fetchPosts } from "../Api/post";

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
    <div className="flex justify-center h-fit items-center p-6 flex-col gap-y-5 mb-10">
      {loading ? (
        <LoadingPage />
      ) : (
        posts.map((post) => <Post key={post.id} data={post} />)
      )}
      <ToastContainer />
    </div>
  );
};
