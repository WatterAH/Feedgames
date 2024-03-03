import React from "react";
import { calculateDate } from "../../functions/date";
import { CommentInterface } from "../../interfaces/Comment";

export const CommentDate = ({ comment }: { comment: CommentInterface }) => {
  const { created_at } = comment;
  const date = calculateDate(created_at, true);
  return <div className="text-xs text-gray-400 dark:text-gray-200">{date}</div>;
};
