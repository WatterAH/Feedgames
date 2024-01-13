import React, { useState } from "react";
import { PostImage } from "./PostImage";
import { ImageViewer } from "./ImageViewer";

export const PostContent = ({ data }) => {
  const { content, publicUrl } = data;
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p className="font-montserrat text-sm">{content}</p>
      <ImageViewer
        isOpen={isOpen}
        closeModal={closeModal}
        publicUrl={publicUrl}
      />
      {publicUrl && <PostImage openModal={openModal} publicUrl={publicUrl} />}
    </div>
  );
};
