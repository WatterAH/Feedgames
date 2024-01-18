import React from "react";
import { calculateDate } from "../../functions/date";

export const CommentDate = ({ comment }) => {
  const { created_at } = comment;
  const date = calculateDate(created_at, true);
  return <div className="text-xs text-gray-400">{date}</div>;
};
