import React from "react";
import Imagep from "./contents/Image";
import MatchPost from "./contents/Match";
import { PostInterface } from "@/interfaces/Post";

interface Props {
  data: PostInterface;
}

const Content: React.FC<Props> = ({ data }) => {
  const { content, valMatch, publicUrl } = data;

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {content && <p className="text-sm dark:text-white">{content}</p>}
      {publicUrl && <Imagep publicUrl={publicUrl} />}
      {valMatch && <MatchPost stats={valMatch} />}
    </div>
  );
};

export default Content;
