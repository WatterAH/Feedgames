import React, { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { toast } from "react-toastify";
import { Loading } from "../Loading";
import { useUser } from "../../context/AuthContext";
import { CommentInterface } from "../../interfaces/Comment";

interface Props {
  id_post: string;
  response: boolean;
  toNotify: string;
  setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>;
  sendFunction: (body: object) => Promise<CommentInterface>;
  comment_res: string;
}

export const CommentBox: React.FC<Props> = ({
  id_post,
  response,
  toNotify,
  setComments,
  sendFunction,
  comment_res,
}) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setComment("");
      const id_user = user.id;
      const name = user.username;
      const body = {
        id_post,
        id_user,
        name,
        comment,
        response,
        toNotify,
        comment_res,
      };
      const commented = await sendFunction(body);
      setComments((prevComms) => [commented, ...prevComms]);
    } catch (error: any) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex bottom-10 gap-x-2 items-center"
    >
      <span className="w-3/4 relative">
        <Input
          placeholder="Escribe un comentario..."
          value={comment}
          maxLength={100}
          onChange={(e) => setComment(e.target.value)}
        />
      </span>
      <span className="w-1/4 flex justify-center relative">
        <Button type="submit" disabled={!comment ? true : false}>
          {loading ? "" : "Continuar"}
        </Button>
        {loading ? <Loading /> : ""}
      </span>
    </form>
  );
};
