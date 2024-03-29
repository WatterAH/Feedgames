import React, { SetStateAction } from "react";
import { calculateDate } from "../../functions/date";
import { PostCreator } from "./PostCreator";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { PostDate } from "./PostDate";
import { PostInterface } from "../../interfaces/Post";
import { Options } from "../Options";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { postOptions } from "./optionsConstant";
import { useUser } from "../../context/AuthContext";
import { deletePostById } from "../../Api/post";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  data: PostInterface;
  setPosts?: React.Dispatch<SetStateAction<PostInterface[]>>;
}

export const PostHeader: React.FC<Props> = ({ data, setPosts }) => {
  const nav = useNavigate();
  const { user_id, user, created_at, id } = data;
  const { name, username, pfp } = user;
  const { user: userSession } = useUser();
  const date = calculateDate(created_at, false);

  const handleDelete = async () => {
    try {
      if (setPosts) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id != id));
      } else {
        nav("/");
      }
      await deletePostById(id);
    } catch (error: any) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const options = postOptions(id, user_id, userSession, handleDelete);

  return (
    <header className="flex flex-col gap-2">
      <section className="flex items-center justify-between">
        <span className="flex items-center gap-x-2">
          <ProfilePicture src={pfp} w={"w-10"} h={"h-10"} />
          <PostCreator user_id={user_id} username={username} name={name} />
        </span>
        <span className="flex flex-col items-end">
          <Options
            Icon_options={EllipsisHorizontalIcon}
            className="h-5 dark:text-white"
            options={options}
          />
          <PostDate>{date}</PostDate>
        </span>
      </section>
    </header>
  );
};
