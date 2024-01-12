import React from "react";
import { PostImage } from "./PostImage";
export const PostContent = ({ data }) => {
  const { content, publicUrl } = data;
  return (
    <div className="flex flex-col gap-y-4">
      <p className="font-montserrat text-sm">{content}</p>
      {publicUrl && <PostImage publicUrl={publicUrl} />}
    </div>
  );
};
