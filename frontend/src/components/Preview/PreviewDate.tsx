import React from "react";
import { calculateDate } from "../../functions/date";
import { PostInterface } from "../../interfaces/Post";

export const PreviewDate = ({ post }: { post: PostInterface }) => {
  const { created_at } = post;
  const date = calculateDate(created_at, true);
  return <p className="text-gray-400 text-xs font-montserrat">{date}</p>;
};
