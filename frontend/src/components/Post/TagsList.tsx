import React from "react";
import { Tag } from "./Tag";
import { PostInterface } from "../../interfaces/Post";

interface Props {
  data: PostInterface;
}

export const TagsList: React.FC<Props> = ({ data }) => {
  const { tags } = data;
  return (
    <section className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Tag text={tag} key={index} />
      ))}
    </section>
  );
};
