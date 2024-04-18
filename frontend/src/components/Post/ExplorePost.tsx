import React, { useEffect, useState } from "react";
import { useUser } from "../../context/AuthContext";
import { Post } from "../Post/Post";
import { LoadingPage } from "../LoadingPage";
import { getPostById } from "../../Api/post";
import { Comments } from "../Comment/Comments";
import { fetchComments as fetchFunction } from "../../Api/comments";
import { commentPost as sendFunction } from "../../Api/comments";
import { NotFound } from "../NotFound";
import { useParams } from "react-router-dom";
import { PostInterface, defaultPost } from "../../interfaces/Post";
import { toast } from "sonner";

export const ExplorePost = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostInterface>(defaultPost);
  const [notFound, setNotFound] = useState(false);

  const getPost = async () => {
    try {
      setLoading(true);
      const postFetched = await getPostById(id as string, user.id);
      if (!postFetched) {
        return setNotFound(true);
      }
      setPost(postFetched);
    } catch (error: any) {
      const { message } = error;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      getPost();
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id, user.id]);

  return (
    <div
      className={`py-5 px-3 w-full lg:ml-64 flex flex-col dark:bg-black ${
        post.comments.length <= 1 && loading
          ? "h-screen justify-center"
          : "h-full"
      }`}
    >
      {loading ? (
        <LoadingPage />
      ) : notFound ? (
        <NotFound title={"post"} />
      ) : (
        post.id && (
          <div className="max-w-2xl w-full mx-auto h-">
            <Post data={post} />
            <Comments
              data={{
                parent_id: id as string,
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
    </div>
  );
};
