import React from "react";

export const PreviewContent = ({ post }) => {
  const { content } = post;
  return (
    <div className="flex flex-col gap-y-2">
      <p className="text-xs">
        {content.length > 200 ? `${content.slice(0, 200)}...` : content}
      </p>
    </div>
  );
};
