import React from "react";
import { useUser } from "../../context/AuthContext";
import { Options } from "./Options";
import { SaveButton } from "../Post/SaveButton";
import { Link } from "react-router-dom";

export const PreviewHeader = ({ post, userID, notSave, setPosts }) => {
  const { user } = useUser();
  const { id, title, archived, isSaved } = post;
  return (
    <header className="flex items-center justify-between">
      <Link to={`/post/${id}`}>
        <h1 className="font-semibold text-xs font-rubik hover:underline">
          {title}
        </h1>
      </Link>
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
