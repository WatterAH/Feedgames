import React from "react";
import Imagep from "./contents/Image";
import MatchPost from "./contents/Match";
import Art from "./contents/Art";
import { PostInterface } from "@/interfaces/Post";

interface Props {
  post: PostInterface;
  showText?: boolean;
}

const Content: React.FC<Props> = ({ post, showText = true }) => {
  const { type, data } = post.content;

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {post.text && showText && <p className="text-sm">{post.text}</p>}
      {type == "image" && <Imagep publicUrl={data.url} />}
      {type == "valorant" && <MatchPost stats={data} />}
      {type == "pixelart" && <Art {...data} />}
    </div>
  );
};

export default Content;
