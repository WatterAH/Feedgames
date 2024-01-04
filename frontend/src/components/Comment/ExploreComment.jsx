import React, { useEffect, useState } from "react";
import { LoadingPage } from "../LoadingPage";
import { fetchComment } from "../../Api/comments";
import { toast } from "react-toastify";
import { Comment } from "./Comment";
import { Responses } from "./Responses";

export const ExploreComment = ({ commentId }) => {
  const [comment, setComment] = useState({});
  const [loading, setLoading] = useState(false);

  const getComment = async () => {
    try {
      setLoading(true);
      const commentFetched = await fetchComment(commentId);
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
      ) : comment.comment ? (
        <div className="max-w-2xl w-full mx-auto">
          <Comment comment={comment} />
          <Responses
            id_post={comment.id_post}
            id_user={comment.id_user}
            commentId={commentId}
          />
        </div>
      ) : null}
    </div>
  );
};
