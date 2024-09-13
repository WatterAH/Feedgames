import React from "react";
import { PostInterface } from "../../interfaces/Post";
import { Link } from "react-router-dom";
import { calculateDate } from "../../functions/date";

interface Props {
  data: PostInterface;
}

const PostHeader: React.FC<Props> = ({ data }) => {
  const { user_id, user, order } = data;
  const { username } = user;
  const date = calculateDate(order);

  return (
    <header className="flex flex-row justify-between">
      <section className="flex flex-row items-center gap-x-1">
        <Link to={`/u/${user_id}`}>
          <p className="hover:underline text-sm font-semibold">{username}</p>
        </Link>
        <p className="text-gray-400 text-xs font-rubik mt-1">{date}</p>
      </section>
      {/* OPTIONS */}
    </header>
  );
};

export default PostHeader;
