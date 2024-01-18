import React from "react";
import { calculateDate } from "../../functions/date";

export const PreviewDate = ({ post }) => {
  const { created_at } = post;
  const date = calculateDate(created_at, true);
  return <p className="text-gray-400 text-xs font-montserrat">{date}</p>;
};
