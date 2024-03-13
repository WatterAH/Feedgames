import React from "react";
import { PostImage } from "./PostImage";
import { PostInterface } from "../../interfaces/Post";
import { MatchPost } from "./Match";
import MarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  data: PostInterface;
}

export const PostContent: React.FC<Props> = ({ data }) => {
  let { content, publicUrl, valMatch } = data;

  return (
    <div className="flex flex-col gap-y-4">
      <span className="font-montserrat text-sm w-fit whitespace-pre-line dark:text-white">
        <MarkDown remarkPlugins={[remarkGfm]}>{content}</MarkDown>
      </span>
      {publicUrl && <PostImage publicUrl={publicUrl} />}
      {valMatch && <MatchPost stats={valMatch} />}
    </div>
  );
};
