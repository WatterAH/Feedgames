import React from "react";
import Link from "next/link";
import { calculateDate } from "@/functions/date";
import { CommentInterface } from "@/interfaces/Comment";
import { stopPropagation } from "@/functions/utils";
import Dropdown from "../Global/Dropdown";
import { BadgeCheck, Ellipsis } from "lucide-react";
import { useResponseOptions } from "@/hooks/useOptions";

interface Props {
  data: CommentInterface;
  deleteComment: (id: string) => void;
}

const Header: React.FC<Props> = ({ data, deleteComment }) => {
  const { user, order, id_user } = data;
  const { username, followers } = user;
  const date = calculateDate(order);
  const options = useResponseOptions(data.id, deleteComment);

  return (
    <header className="flex flex-row justify-between relative">
      <section className="flex flex-row items-center gap-x-1">
        <Link href={`/u/${id_user}`} onClick={stopPropagation}>
          <span className="flex items-center gap-x-1">
            <p className="hover:underline text-sm dark:text-white font-semibold">
              {username}
            </p>
            {followers > 2 && (
              <BadgeCheck fill="#38bdf8" className="text-white h-4 w-4 mt-1" />
            )}
          </span>
        </Link>
        <p className="text-gray-400 text-xs mt-1">{date}</p>
      </section>
      <section>
        <div className="absolute right-1 -top-1 flex items-center">
          <Dropdown
            Icon={Ellipsis}
            position="left"
            options={options}
            iconClass="h-5 text-secondaryicon"
          />
        </div>
      </section>
    </header>
  );
};

export default Header;
