import React from "react";
import { Link } from "react-router-dom";

interface Props {
  user_id: string;
  username: string;
  name: string;
}

export const PostCreator: React.FC<Props> = ({ user_id, username, name }) => {
  return (
    <div>
      <h1 className="text-lg font-montserrat dark:text-white">{name}</h1>
      <Link to={`/u/${user_id}`} className="flex items-center gap-x-1">
        <p className="hover:underline text-gray-400 text-sm font-rubik">
          @{username}
        </p>
      </Link>
    </div>
  );
};
