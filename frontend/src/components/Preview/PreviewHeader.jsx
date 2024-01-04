import React from "react";
import { explorerContent } from "../../home/Home";
import { useUser } from "../../context/AuthContext";
import { Options } from "./Options";
import { SaveButton } from "../Post/SaveButton";

export const PreviewHeader = ({ post, userID, notSave, setPosts }) => {
  const { user } = useUser();
  const { id, title, archived, isSaved } = post;
  return (
    <header className="flex items-center justify-between">
      <h1 className="font-semibold text-xs font-rubik">
        <button
          className="hover:underline"
          onClick={() => explorerContent("Post", id)}
        >
          {title}
        </button>
      </h1>
      {user.id === userID ? (
        <Options optionsData={{ archived, id }} setPosts={setPosts} />
      ) : null}
      {!notSave ? (
        user.id !== userID ? (
          <SaveButton saveData={{ id: id, isSaved }} />
        ) : null
      ) : null}
    </header>
  );
};
