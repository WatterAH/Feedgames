import React, { SetStateAction } from "react";
import { calculateDate } from "../../functions/date";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { PostInterface } from "../../interfaces/Post";
import { Options } from "../Options";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { postOptions } from "./optionsConstant";
import { useUser } from "../../context/AuthContext";
import { deletePostById } from "../../Api/post";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  data: PostInterface;
  setPosts?: React.Dispatch<SetStateAction<PostInterface[]>>;
}

export const PostHeader: React.FC<Props> = ({ data, setPosts }) => {
  const nav = useNavigate();
  const { user_id, user, id, order } = data;
  const { name, username, pfp } = user;
  const { user: userSession } = useUser();
  const date = calculateDate(order);

  const handleDelete = async () => {
    try {
      if (setPosts) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id != id));
        await deletePostById(id);
      } else {
        await deletePostById(id);
        nav("/");
      }
    } catch (error: any) {
      const { message } = error;
      toast.error(message);
    }
  };

  const options = postOptions(id, user_id, userSession, handleDelete);

  return (
    <header className="flex flex-col gap-2">
      <section className="flex items-center justify-between">
        <span className="flex items-center gap-x-2">
          <ProfilePicture src={pfp} w={"w-10"} h={"h-10"} />
          <div>
            <h1 className="font-inter dark:text-white">{name}</h1>
            <Link to={`/u/${user_id}`} className="flex items-center gap-x-1">
              <p className="hover:underline text-gray-400 text-sm font-rubik">
                @{username}
              </p>
            </Link>
          </div>
        </span>
        <span className="flex flex-col items-end">
          <Options
            Icon_options={EllipsisHorizontalIcon}
            className="h-5 dark:text-white"
            options={options}
          />
          <p className="text-gray-400 text-xs font-rubik">{date}</p>
        </span>
      </section>
    </header>
  );
};
