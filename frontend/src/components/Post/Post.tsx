import React, { SetStateAction } from "react";
import { PostHeader } from "./PostHeader";
import { TagsList } from "./TagsList";
import { Actions } from "./Actions";
import { PostContent } from "./PostContent";
import { PostInterface } from "../../interfaces/Post";

interface Props {
  data: PostInterface;
  setPosts: React.Dispatch<SetStateAction<PostInterface[]>>;
}

export const Post: React.FC<Props> = ({ data, setPosts }) => {
  return (
    <div className="w-full duration-700 border-b flex flex-col gap-y-4">
      <PostHeader data={data} setPosts={setPosts} />
      <PostContent data={data}></PostContent>
      <TagsList data={data} />
      <Actions data={data} />
    </div>
  );
};
