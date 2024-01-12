import React from "react";

export const PostImage = ({ publicUrl }) => {
  return <img src={publicUrl} alt="image" className="rounded-md" />;
};
