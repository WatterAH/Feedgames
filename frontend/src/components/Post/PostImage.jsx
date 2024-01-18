import React from "react";

export const PostImage = ({ publicUrl, openModal }) => {
  const src = `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/images/${publicUrl}`;
  return (
    <img
      onClick={openModal}
      src={src}
      alt="image"
      className="rounded-md cursor-pointer"
    />
  );
};
