import React, { useState } from "react";
import { PostImage } from "./PostImage";
import { ImageViewer } from "./ImageViewer";
import { PostInterface } from "../../interfaces/Post";
import MarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  data: PostInterface;
}

export const PostContent: React.FC<Props> = ({ data }) => {
  let { content, publicUrl } = data;
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p className="font-montserrat text-sm w-fit whitespace-pre-line">
        <MarkDown remarkPlugins={[remarkGfm]}>{content}</MarkDown>
      </p>
      <ImageViewer
        isOpen={isOpen}
        closeModal={closeModal}
        publicUrl={publicUrl}
      />
      {publicUrl && <PostImage openModal={openModal} publicUrl={publicUrl} />}
    </div>
  );
};
