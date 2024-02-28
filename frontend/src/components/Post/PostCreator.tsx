import { CheckBadgeIcon } from "@heroicons/react/24/solid";
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
      <h1 className="text-lg font-montserrat">{name}</h1>
      <Link to={`/u/${user_id}`} className="flex items-center gap-x-1">
        <p className="hover:underline text-gray-400 text-sm font-rubik">
          @{username}
        </p>
        {user_id == "6f74216e-6730-4064-9685-0e9672c9ffa4" ? (
          <CheckBadgeIcon aria-hidden="true" className="text-blue-400 h-4" />
        ) : (
          ""
        )}
      </Link>
    </div>
  );
};
