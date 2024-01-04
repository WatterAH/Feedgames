import React from "react";

export const CommentText = ({ comment }) => {
  const { comment: commentText } = comment;
  return (
    <div
      className={`flex flex-col border border-gray-300 h-16 bg-white p-3 rounded-md shadow-sm`}
    >
      <p className="text-gray-700 text-sm mt-3">{commentText}</p>
    </div>
  );
};
