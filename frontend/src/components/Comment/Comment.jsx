import React from "react";
import { Commentator } from "./Commentator";
import { CommentText } from "./CommentText";
import { CommentDate } from "./CommentDate";
import { ReplyTo } from "./ReplyTo";
import { Options } from "./Options";
import { useUser } from "../../context/AuthContext";
import { formatNumber } from "../../functions/numbers";

export const Comment = ({ comment, setComments, option }) => {
  const { user } = useUser();
  const { responses } = comment;

  return (
    <div className="relative">
      <Commentator comment={comment} />
      <section className="absolute right-3 top-2 flex gap-x-4 items-center">
        {comment.id_user == user.id && option ? (
          <Options optionsData={{ id: comment.id }} setComments={setComments} />
        ) : null}
        <span className="flex gap-x-2 items-center">
          <ReplyTo comment={comment} />
          <p className="text-gray-500 text-xs">
            {formatNumber(responses.length)}
          </p>
        </span>
      </section>
      <CommentText comment={comment} />
      <CommentDate comment={comment} />
    </div>
  );
};
