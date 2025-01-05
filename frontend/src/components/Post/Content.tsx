import React from "react";
import Imagep from "./contents/Image";
import MatchPost from "./contents/Match";
import { PostInterface } from "@/interfaces/Post";

interface Props {
  post: PostInterface;
}

const Content: React.FC<Props> = ({ post }) => {
  const { type, data } = post.content;

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <>
        {post.text && <p className="text-sm dark:text-white">{post.text}</p>}
        {type == "image" && <Imagep publicUrl={data.url} />}
        {type == "valorant" && <MatchPost stats={data} />}
      </>
    </div>
  );
};

export default Content;
