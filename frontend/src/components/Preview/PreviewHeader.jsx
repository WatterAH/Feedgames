import React from "react";
import { useUser } from "../../context/AuthContext";
import { Options } from "./Options";
import { SaveButton } from "../Post/SaveButton";
import { PreviewTitle } from "./PreviewTitle";

export const PreviewHeader = ({ post, userID, notSave, setPosts }) => {
  const { user } = useUser();
  const { id, user: userPost, archived, isSaved, user_id } = post;
  return (
    <header className="flex items-center justify-between">
      <PreviewTitle user_id={user_id} user={userPost} />
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
