import React, { useEffect, useState } from "react";
import { useUser } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { Post } from "../Post/Post";
import { LoadingPage } from "../LoadingPage";
import { getPostById } from "../../Api/post";
import { Comments } from "../Comment/Comments";
import { fetchComments as fetchFunction } from "../../Api/comments";
import { commentPost as sendFunction } from "../../Api/comments";
import { NotFound } from "../NotFound";
import { useParams } from "react-router-dom";

export const ExplorePost = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const [notFound, setNotFound] = useState(false);

  const getPost = async () => {
    try {
      setLoading(true);
      const postFetched = await getPostById(id, user.id);
      if (!postFetched) {
        return setNotFound(true);
      }
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
  }, [id, user.id]);

  return (
    <div
      className={`py-5 px-3 w-full lg:ml-64 flex flex-col h-screen ${
        loading ? "justify-center" : ""
      }`}
    >
      {loading ? (
        <LoadingPage />
      ) : notFound ? (
        <NotFound title={"post"} />
      ) : (
        post.id && (
          <div className="max-w-2xl w-full mx-auto">
            <Post data={post} />
            <Comments
              data={{
                parent_id: id,
                post_id: post.id,
                toNotify: post.user_id,
                response: false,
                fetchFunction,
                sendFunction,
              }}
            />
          </div>
        )
      )}
      <ToastContainer />
    </div>
  );
};
