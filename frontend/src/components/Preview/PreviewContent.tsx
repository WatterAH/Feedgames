import React from "react";
import { PostInterface } from "../../interfaces/Post";
import MarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

export const PreviewContent = ({ post }: { post: PostInterface }) => {
  const { content } = post;
  return (
    <div className="flex flex-col gap-y-2">
      <p className="text-xs">
        <MarkDown remarkPlugins={[remarkGfm]}>
          {content.length > 200 ? `${content.slice(0, 200)}...` : content}
        </MarkDown>
      </p>
    </div>
  );
};
