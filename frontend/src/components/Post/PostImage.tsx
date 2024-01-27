import React from "react";

interface Props {
  publicUrl: string;
  openModal: () => void;
}

export const PostImage: React.FC<Props> = ({ publicUrl, openModal }) => {
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
