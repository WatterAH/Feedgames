import React from "react";
import { PostInterface } from "../../interfaces/Post";
import { Link } from "react-router-dom";
import { calculateDate } from "../../functions/date";
import Options from "../Global/Options";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { postOptions } from "../../constants/postOptions";
import { useUser } from "../../context/AuthContext";

interface Props {
  data: PostInterface;
}

const PostHeader: React.FC<Props> = ({ data }) => {
  const { id, user_id, user, order } = data;
  const { username } = user;
  const { user: session } = useUser();
  const date = calculateDate(order);
  const options = postOptions(id, user_id, session, () => {});

  return (
    <header className="flex flex-row justify-between">
      <section className="flex flex-row items-center gap-x-1">
        <Link to={`/u/${user_id}`}>
          <p className="hover:underline text-sm font-semibold">{username}</p>
        </Link>
        <p className="text-gray-400 text-xs font-rubik mt-1">{date}</p>
      </section>
      <section>
        <Options
          Icon_options={EllipsisHorizontalIcon}
          className="h-5"
          options={options}
        />
      </section>
    </header>
  );
};

export default PostHeader;
