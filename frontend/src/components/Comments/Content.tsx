import { CommentInterface } from "@/interfaces/Comment";
import React from "react";

interface Props {
  data: CommentInterface;
}

const Content: React.FC<Props> = ({ data }) => {
  const { comment } = data;
  return <p className="text-sm">{comment}</p>;
};

export default Content;
