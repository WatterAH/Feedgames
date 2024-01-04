import React from "react";
import { calculateDate } from "../../functions/date";

export const CommentDate = ({ comment }) => {
  const { created_at } = comment;
  const date = calculateDate(created_at);
  return (
    <div className="text-xs text-gray-400 absolute right-2 bottom-2">
      {date}
    </div>
  );
};
