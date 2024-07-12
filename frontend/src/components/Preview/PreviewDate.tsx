import React from "react";
import { calculateDate } from "../../functions/date";
import { PostInterface } from "../../interfaces/Post";

export const PreviewDate = ({ post }: { post: PostInterface }) => {
  const { order } = post;
  const date = calculateDate(order);
  return <p className="text-gray-400 text-xs font-montserrat">{date}</p>;
};
