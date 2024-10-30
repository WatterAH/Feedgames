import React from "react";
import Imagep from "./contents/Image";
import MatchPost from "./contents/Match";
import { PostInterface } from "@/interfaces/Post";
import { CommentInterface } from "@/interfaces/Comment";

interface Props {
  data: PostInterface | CommentInterface;
}

const Content: React.FC<Props> = ({ data }) => {
  const isPost = (
    data: PostInterface | CommentInterface
  ): data is PostInterface => {
    return (data as PostInterface).valMatch !== undefined;
  };

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {isPost(data) ? (
        <>
          {data.content && (
            <p className="text-sm dark:text-white">{data.content}</p>
          )}
          {data.publicUrl && <Imagep publicUrl={data.publicUrl} />}
          {data.valMatch && <MatchPost stats={data.valMatch} />}
        </>
      ) : (
        <>
          {data.comment && (
            <p className="text-sm dark:text-white">{data.comment}</p>
          )}
          {data.imageUrl && <Imagep publicUrl={data.imageUrl} />}
        </>
      )}
    </div>
  );
};

export default Content;
