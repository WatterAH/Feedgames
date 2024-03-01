import React, { useEffect, useState } from "react";
import { LoadingPage } from "../LoadingPage";
import { fetchComment } from "../../Api/comments";
import { ToastContainer, toast } from "react-toastify";
import { Comment } from "./Comment";
import { Comments } from "./Comments";
import { fetchResponses as fetchFunction } from "../../Api/comments";
import { responseComment as sendFunction } from "../../Api/comments";
import { NotFound } from "../NotFound";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/AuthContext";
import { defaultComment } from "../../interfaces/Comment";

export const ExploreComment = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [comment, setComment] = useState(defaultComment);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const getComment = async () => {
    try {
      setLoading(true);
      const commentFetched = await fetchComment(id as string, user.id);
      if (!commentFetched) {
        return setNotFound(true);
      }
      setComment(commentFetched);
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
      getComment();
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id, user.id]);

  return (
    <div
      className={`py-7 px-3 w-full lg:ml-64 flex flex-col h-screen ${
        loading ? "justify-center" : ""
      }`}
    >
      {loading ? (
        <LoadingPage />
      ) : notFound ? (
        <NotFound title={"comentario"} />
      ) : comment.comment ? (
        <div className="max-w-2xl w-full mx-auto">
          <Comment comment={comment} option={false} />
          <Comments
            data={{
              parent_id: id as string,
              post_id: comment.id_post,
              toNotify: comment.id_user,
              response: true,
              fetchFunction,
              sendFunction,
            }}
          />
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
};
