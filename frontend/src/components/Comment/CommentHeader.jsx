import React from "react";
import { Commentator } from "./Commentator";
import { useUser } from "../../context/AuthContext";
import { Options } from "../Options";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteComment } from "../../Api/comments";

export const CommentHeader = ({ comment, option, setComments }) => {
  const { user } = useUser();
  const { id } = comment;

  const handleDelete = async () => {
    try {
      setComments((prevResponses) =>
        prevResponses.filter((response) => response.id != id)
      );
      await deleteComment(id);
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const options = [
    {
      label: "Eliminar",
      icon: faTrash,
      textColor: "text-red-500",
      onClick: handleDelete,
    },
  ];

  return (
    <header className="flex justify-between gap-x-3">
      <Commentator comment={comment} />
      {comment.id_user == user.id && option ? (
        <Options icon_options={faEllipsis} options={options} />
      ) : null}
    </header>
  );
};
