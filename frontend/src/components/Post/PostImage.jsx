import React from "react";
import { Link } from "react-router-dom";

export const PostImage = ({ publicUrl }) => {
  return (
    <Link to={publicUrl}>
      <img src={publicUrl} alt="image" className="rounded-md" />
    </Link>
  );
};
