import React from "react";

export const PreviewContent = ({ post }) => {
  const { content, publicUrl } = post;
  return (
    <p className="text-xs">
      {content.slice(0, 160)}
      {content.length > 160 ? "..." : ""}
      {publicUrl && (
        <p className="font-rubik text-sm text-gray-800">+1 imagen</p>
      )}
    </p>
  );
};
