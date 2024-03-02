import React, { useState } from "react";
import { PostImage } from "./PostImage";
import { ImageViewer } from "./ImageViewer";
import { PostInterface } from "../../interfaces/Post";

interface Props {
  data: PostInterface;
}

export const PostContent: React.FC<Props> = ({ data }) => {
  const { content, publicUrl } = data;
  let [isOpen, setIsOpen] = useState(false);
  const lines = content.split("\n");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p className="font-montserrat text-sm">
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index !== lines.length - 1 && <br />}{" "}
          </React.Fragment>
        ))}
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
