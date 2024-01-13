import React from "react";
import { calculateDate } from "../../functions/date";
import { PostCreator } from "./PostCreator";
import { PostTitle } from "./PostTitle";
import { ProfilePicture } from "../Profile/ProfilePicture";

export const PostHeader = ({ data }) => {
  const { user_id, user, created_at } = data;
  const { name, username, pfp } = user;
  const date = calculateDate(created_at);

  return (
    <header className="flex flex-col gap-2">
      <section className="flex items-center justify-between">
        <span className="flex items-center gap-x-2">
          <ProfilePicture src={pfp} size={"10"} />
          <div>
            <PostTitle name={name} />
            <PostCreator user_id={user_id} username={username} />
          </div>
        </span>
        <p className="text-gray-400 text-xs font-rubik">{date}</p>
      </section>
    </header>
  );
};
