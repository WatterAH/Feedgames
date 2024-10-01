import React from "react";
import { PostInterface } from "@/interfaces/Post";
import { MatchPost } from "./contents/Match";

interface Props {
  data: PostInterface;
}

const PostContent: React.FC<Props> = ({ data }) => {
  const { content, valMatch, publicUrl } = data;
  const src = `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/images/${publicUrl}`;

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {content && <p className="text-sm">{content}</p>}
      {publicUrl && (
        <img src={src} alt={publicUrl} className="rounded-md w-full h-full" />
      )}
      {valMatch && <MatchPost stats={valMatch} />}
    </div>
  );
};

export default PostContent;
