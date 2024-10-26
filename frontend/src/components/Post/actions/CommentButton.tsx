import React, { useState } from "react";
import Comment from "../Comment";
import { MessageCircle } from "lucide-react";
import { PostInterface } from "@/interfaces/Post";
import { stopPropagation } from "@/functions/utils";

interface Props {
  data: PostInterface;
}

const CommentButton: React.FC<Props> = ({ data }) => {
  const { isCommented } = data;
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="active:scale-125 transition-transform"
      >
        <MessageCircle
          aria-hidden="true"
          fill={isCommented ? "#67e8f9" : "transparent"}
          className="h-5 w-5 text-cyan-300"
        />
      </button>
      <Comment open={open} setOpen={setOpen} data={data} />
    </>
  );
};

export default CommentButton;
