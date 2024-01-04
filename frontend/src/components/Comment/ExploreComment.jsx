import React, { useEffect, useState } from "react";
import { LoadingPage } from "../LoadingPage";
import { fetchComment } from "../../Api/comments";
import { ToastContainer, toast } from "react-toastify";
import { Comment } from "./Comment";
import { Comments } from "./Comments";
import { fetchResponses as fetchFunction } from "../../Api/comments";
import { responseComment as sendFunction } from "../../Api/comments";
import { NotFound } from "../NotFound";

export const ExploreComment = ({ commentId }) => {
  const [comment, setComment] = useState({});
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const getComment = async () => {
    try {
      setLoading(true);
      const commentFetched = await fetchComment(commentId);
      if (!commentFetched) {
        return setNotFound(true);
      }
      setComment(commentFetched);
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
    getComment();
  }, [commentId]);

  return (
    <div
      className={`py-7 flex flex-col h-screen ${
        loading ? "justify-center" : ""
      }`}
    >
      {loading ? (
        <LoadingPage />
      ) : notFound ? (
        <NotFound title={"comentario"} />
      ) : comment.comment ? (
        <div className="max-w-2xl w-full mx-auto">
          <Comment comment={comment} />
          <Comments
            data={{
              parent_id: commentId,
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
