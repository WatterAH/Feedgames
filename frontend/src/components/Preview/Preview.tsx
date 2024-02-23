import React from "react";
import { PreviewHeader } from "./PreviewHeader";
import { PreviewContent } from "./PreviewContent";
import { Link } from "react-router-dom";
import { PostInterface } from "../../interfaces/Post";

interface Props {
  post: PostInterface;
  notSave?: boolean;
}

export const Preview: React.FC<Props> = ({ post, notSave }) => {
  const { id } = post;
  return (
    <Link to={`/p/${id}`}>
      <div className="font-montserrat w-full h-32 border-b flex flex-col px-3 py-2 gap-y-1">
        <PreviewHeader post={post} notSave={notSave} />
        <PreviewContent post={post} />
      </div>
    </Link>
  );
};
