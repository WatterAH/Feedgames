import React from "react";
import { Link } from "react-router-dom";
import { CommentDate } from "./CommentDate";
import { CommentInterface } from "../../interfaces/Comment";

export const Commentator = ({ comment }: { comment: CommentInterface }) => {
  const { user, id_user } = comment;
  const { username } = user;
  return (
    <Link to={`/profile/${id_user}`} className="flex items-center gap-x-2">
      <p className="text-montserrat text-sm hover:underline">@{username}</p>
      <CommentDate comment={comment} />
    </Link>
  );
};
