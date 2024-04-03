import React from "react";
import { PostInterface } from "../../interfaces/Post";
import { MatchPost } from "./Match";
import MarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  data: PostInterface;
}

export const PostContent: React.FC<Props> = ({ data }) => {
  let { content, publicUrl, valMatch } = data;
  const src = `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/images/${publicUrl}`;

  return (
    <div className="flex flex-col gap-y-4">
      <span className="font-montserrat text-sm w-fit whitespace-pre-line dark:text-white">
        <MarkDown remarkPlugins={[remarkGfm]}>{content}</MarkDown>
      </span>
      {publicUrl && (
        <img src={src} alt="image" className="rounded-md cursor-pointer" />
      )}
      {valMatch && <MatchPost stats={valMatch} />}
    </div>
  );
};
