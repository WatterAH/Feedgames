import React from "react";
import { calculateDate } from "../../functions/date";
import { PostCreator } from "./PostCreator";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { PostDate } from "./PostDate";
import { PostInterface } from "../../interfaces/Post";

interface Props {
  data: PostInterface;
}

export const PostHeader: React.FC<Props> = ({ data }) => {
  const { user_id, user, created_at } = data;
  const { name, username, pfp } = user;
  const date = calculateDate(created_at, false);

  return (
    <header className="flex flex-col gap-2">
      <section className="flex items-center justify-between">
        <span className="flex items-center gap-x-2">
          <ProfilePicture src={pfp} w={"w-10"} h={"h-10"} />
          <PostCreator user_id={user_id} username={username} name={name} />
        </span>
        <PostDate>{date}</PostDate>
      </section>
    </header>
  );
};
