import React from "react";
import { SaveButton } from "../Post/SaveButton";
import { PreviewCreator } from "./PreviewCreator";
import { PostInterface } from "../../interfaces/Post";

interface Props {
  post: PostInterface;
  notSave?: boolean;
}

export const PreviewHeader: React.FC<Props> = ({ post, notSave }) => {
  const { id, isSaved } = post;

  return (
    <header className="flex items-center justify-between">
      <PreviewCreator post={post} />
      {!notSave ? <SaveButton saveData={{ id: id, isSaved }} /> : null}
    </header>
  );
};
