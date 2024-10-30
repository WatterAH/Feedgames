import React, { useState } from "react";
import Response from "@/components/Post/Response";
import { MessageSquareQuote } from "lucide-react";
import { stopPropagation } from "@/functions/utils";
import { CommentInterface } from "@/interfaces/Comment";

interface Props {
  data: CommentInterface;
}

const ResponseButton: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="active:scale-75 transition-transform"
      >
        <MessageSquareQuote
          aria-hidden="true"
          className="h-5 w-5 text-cyan-500"
        />
      </button>
      <Response open={open} setOpen={setOpen} data={data} parentId={data.id} />
    </>
  );
};

export default ResponseButton;
