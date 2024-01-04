import React, { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { toast } from "react-toastify";
import { useUser } from "../../context/AuthContext";
import { commentPost, responseComment } from "../../Api/comments";

export const CommentBox = ({
  id_post,
  response,
  setComments,
  id_responsed,
  user_post,
  id_user_responsed,
}) => {
  const { user } = useUser();
  const [comment, setComment] = useState("");

  const handleCommentPost = async (e) => {
    e.preventDefault();
    try {
      setComment("");
      const body = {
        id_post,
        id_user: user.id,
        name: user.username,
        comment,
        response,
        user_post,
      };
      const commented = await commentPost(body);
      setComments((prevComms) => [commented, ...prevComms]);
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const handleResponseComment = async (e) => {
    e.preventDefault();
    try {
      setComment("");
      const body = {
        id_post,
        id_user: user.id,
        name: user.username,
        comment,
        response,
        id_responsed,
        id_user_responsed,
      };
      const commented = await responseComment(body);
      setComments((prevComms) => [commented, ...prevComms]);
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  return (
    <form
      onSubmit={response ? handleResponseComment : handleCommentPost}
      className="flex bottom-10 gap-x-2 items-center"
    >
      <span className="w-3/4 relative">
        <Input
          placeholder="Escribe un comentario..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </span>
      <span className="w-1/4">
        <Button>Enviar</Button>
      </span>
    </form>
  );
};
