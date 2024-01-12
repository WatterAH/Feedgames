import React from "react";

export const CommentDate = ({ comment }) => {
  const { order } = comment;
  return (
    <div className="text-xs text-gray-400 absolute right-2 bottom-2">
      {order.slice(5, 10)}
    </div>
  );
};
