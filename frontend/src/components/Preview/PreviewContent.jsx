import React from "react";

export const PreviewContent = ({ post }) => {
  const { content } = post;
  return (
    <p className="text-xs">
      {content.slice(0, 160)}
      {content.length > 160 ? "..." : ""}
    </p>
  );
};
