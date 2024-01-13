import React from "react";

export const PostImage = ({ publicUrl, openModal }) => {
  return (
    <img
      onClick={openModal}
      src={publicUrl}
      alt="image"
      className="rounded-md cursor-pointer"
    />
  );
};
