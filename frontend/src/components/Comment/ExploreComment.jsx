import React, { useEffect, useState } from "react";
import { LoadingPage } from "../LoadingPage";
import { fetchComment } from "../../Api/comments";
import { ToastContainer, toast } from "react-toastify";
import { Comment } from "./Comment";
import { Comments } from "./Comments";
import { fetchResponses as fetchFunction } from "../../Api/comments";
import { responseComment as sendFunction } from "../../Api/comments";
import { NotFound } from "../NotFound";
import { useNavigate, useParams } from "react-router-dom";
import { checkAuth } from "../../Api/auth";
import { useUser } from "../../context/AuthContext";

export const ExploreComment = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { login } = useUser();
  const [comment, setComment] = useState({});
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleToken = async () => {
    try {
      const data = await checkAuth();
      login(data);
    } catch (error) {
      nav("/auth");
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  const getComment = async () => {
    try {
      setLoading(true);
      const commentFetched = await fetchComment(id);
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
  }, [id]);

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
          <Comment comment={comment} />
          <Comments
            data={{
              parent_id: id,
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
