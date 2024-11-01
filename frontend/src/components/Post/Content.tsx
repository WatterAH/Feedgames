import React from "react";
import Imagep from "./contents/Image";
import MatchPost from "./contents/Match";
import { PostInterface } from "@/interfaces/Post";

interface Props {
  data: PostInterface;
}

const Content: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <>
        {data.content && (
          <p className="text-sm dark:text-white">{data.content}</p>
        )}
        {data.publicUrl && <Imagep publicUrl={data.publicUrl} />}
        {data.valMatch && <MatchPost stats={data.valMatch} />}
      </>
    </div>
  );
};

export default Content;
