import React from "react";
import { Tag } from "./Tag";

export const TagsList = ({ data }) => {
  const { tags } = data;
  return (
    <section className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Tag text={tag} key={index} />
      ))}
    </section>
  );
};
