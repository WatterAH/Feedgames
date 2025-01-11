import React from "react";
import { User } from "@/interfaces/User";
import { BadgeCheck } from "lucide-react";

interface Props {
  data: User;
  nameClass: string;
  usernameClass: string;
}

const Names: React.FC<Props> = ({ data, nameClass, usernameClass }) => {
  const { username, followers, name } = data;

  return (
    <div className="flex flex-col gap-y-1">
      <span className="flex flex-row items-center gap-x-1">
        <h1 className={`text-3xl ${usernameClass} font-inter font-semibold`}>
          {username}
        </h1>
        {followers > 2 && <BadgeCheck fill="#38bdf8" className="h-8" />}
      </span>
      <p className={`${nameClass} dark:text-gray-200`}>{name}</p>
    </div>
  );
};

export default Names;
