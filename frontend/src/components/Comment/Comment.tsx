import React from "react";
import { CommentText } from "./CommentText";
import { ReplyTo } from "./ReplyTo";
import { CommentHeader } from "./CommentHeader";
import default_pfp from "../../assets/img/default.png";
import { Link } from "react-router-dom";
import { LikeButton } from "./LikeButton";
import { CommentInterface } from "../../interfaces/Comment";

interface Props {
  comment: CommentInterface;
  setComments?: React.Dispatch<React.SetStateAction<CommentInterface[]>>;
  hasDelete: boolean;
}

export const Comment: React.FC<Props> = ({
  comment,
  setComments,
  hasDelete,
}) => {
  const { comment: commentText, user, id_user } = comment;
  const { pfp } = user;
  const src = pfp
    ? `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/pfp/${pfp}`
    : default_pfp;

  return (
    <div className="w-fit">
      <div className="flex items-center gap-x-2">
        <Link to={`/u/${id_user}`}>
          <img src={src} alt="pfp" className="rounded-full h-8 w-8" />
        </Link>
        <div className="rounded-xl w-fit pb-2 pt-1 px-3 bg-gray-100 dark:bg-neutral-600">
          <CommentHeader
            comment={comment}
            hasDelete={hasDelete}
            setComments={setComments}
          />
          <CommentText>{commentText}</CommentText>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-2 mt-1">
        <LikeButton comment={comment} />
        <ReplyTo comment={comment} />
      </div>
    </div>
  );
};
