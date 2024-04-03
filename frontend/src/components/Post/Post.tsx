import React, { SetStateAction } from "react";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostInterface } from "../../interfaces/Post";
import { PostActions } from "./PostActions";
import { Tag } from "./Tag";

const MapTags = ({ data }: { data: PostInterface }) => {
  const { tags } = data;
  return (
    <section className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Tag text={tag} key={index} />
      ))}
    </section>
  );
};

interface Props {
  data: PostInterface;
  setPosts?: React.Dispatch<SetStateAction<PostInterface[]>>;
}

export const Post: React.FC<Props> = ({ data, setPosts }) => {
  return (
    <div className="w-full duration-700 border-b flex flex-col gap-y-4">
      <PostHeader data={data} setPosts={setPosts} />
      <PostContent data={data}></PostContent>
      <MapTags data={data} />
      <PostActions data={data} />
    </div>
  );
};
