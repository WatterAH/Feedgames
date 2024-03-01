import React from "react";
import { Commentator } from "./Commentator";
import { useUser } from "../../context/AuthContext";
import { Options } from "../Options";
import { deleteComment } from "../../Api/comments";
import { toast } from "react-toastify";
import { CommentInterface } from "../../interfaces/Comment";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { optionsComment } from "./optionsConstant";

interface Props {
  comment: CommentInterface;
  option: boolean;
  setComments?: React.Dispatch<React.SetStateAction<CommentInterface[]>>;
}

export const CommentHeader: React.FC<Props> = ({
  comment,
  option,
  setComments,
}) => {
  const { user } = useUser();
  const { id, id_user } = comment;

  const handleDelete = async () => {
    try {
      if (setComments) {
        setComments((prevResponses) =>
          prevResponses.filter((response) => response.id != id)
        );
      }
      await deleteComment(id);
    } catch (error: any) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const options = optionsComment(id_user, user, handleDelete);

  return (
    <header className="flex justify-between gap-x-3">
      <Commentator comment={comment} />
      {option ? (
        <Options
          Icon_options={EllipsisHorizontalIcon}
          options={options}
          className="h-4 text-gray-700 mt-2"
        />
      ) : null}
    </header>
  );
};
