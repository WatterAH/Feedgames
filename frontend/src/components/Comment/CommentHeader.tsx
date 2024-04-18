import React from "react";
import { Commentator } from "./Commentator";
import { useUser } from "../../context/AuthContext";
import { Options } from "../Options";
import { deleteComment } from "../../Api/comments";
import { CommentInterface } from "../../interfaces/Comment";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { commentOptions } from "./optionsConstant";
import { toast } from "sonner";

interface Props {
  comment: CommentInterface;
  hasDelete: boolean;
  setComments?: React.Dispatch<React.SetStateAction<CommentInterface[]>>;
}

export const CommentHeader: React.FC<Props> = ({
  comment,
  hasDelete,
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
      toast.error(message);
    }
  };

  const options = commentOptions(id_user, id, user, handleDelete, hasDelete);

  return (
    <header className="flex justify-between gap-x-3">
      <Commentator comment={comment} />
      <Options
        Icon_options={EllipsisHorizontalIcon}
        options={options}
        className="h-4 text-gray-700 dark:text-white mt-2"
      />
    </header>
  );
};
