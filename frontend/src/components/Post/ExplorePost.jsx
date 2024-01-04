import React, { useEffect, useState } from "react";
import { useUser } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { Post } from "../Post/Post";
import { LoadingPage } from "../LoadingPage";
import { Comments } from "../Comment/Comments";
import { getPostById } from "../../Api/post";

export const ExplorePost = ({ postId }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});

  const getPost = async () => {
    try {
      setLoading(true);
      const postFetched = await getPostById(postId, user.id);
      setPost(postFetched);
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
      getPost();
    }
  }, [postId, user.id]);

  return (
    <div
      className={`py-3 flex flex-col h-screen ${
        loading ? "justify-center" : ""
      }`}
    >
      {loading ? (
        <LoadingPage />
      ) : post.title ? (
        <div className="max-w-2xl w-full mx-auto">
          <Post data={post} />
          <Comments post_id={post.id} post_user={post.user_id} />
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
};
