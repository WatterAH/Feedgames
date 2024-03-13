import React from "react";

interface Props {
  publicUrl: string;
}

export const PostImage: React.FC<Props> = ({ publicUrl }) => {
  const src = `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/images/${publicUrl}`;
  return <img src={src} alt="image" className="rounded-md cursor-pointer" />;
};
