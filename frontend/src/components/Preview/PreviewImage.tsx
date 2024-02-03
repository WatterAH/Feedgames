import React from "react";
import default_pfp from "../../assets/img/default.png";
import { PostInterface } from "../../interfaces/Post";

export const PreviewImage = ({ post }: { post: PostInterface }) => {
  const { publicUrl, user } = post;
  const { pfp } = user;
  const src = pfp
    ? `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/pfp/${pfp}`
    : default_pfp;

  return (
    <div className="h-40">
      <img
        src={publicUrl ? publicUrl : src}
        alt="pfp"
        className="rounded-md w-full h-full"
      />
    </div>
  );
};
