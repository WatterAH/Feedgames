import React from "react";
import Link from "next/link";
import Dropdown from "../Global/Dropdown";
import { PostInterface } from "@/interfaces/Post";
import { calculateDate } from "@/functions/date";
import { BadgeCheck, Ellipsis } from "lucide-react";
import { stopPropagation } from "@/functions/utils";
import { usePostOptions } from "@/hooks/useOptions";

interface Props {
  data: PostInterface;
}

const Header: React.FC<Props> = ({ data }) => {
  const { id, user_id, user, order } = data;
  const { username, followers } = user;
  const date = calculateDate(order);
  const options = usePostOptions(id, user_id);

  return (
    <header className="flex flex-row justify-between">
      <section className="flex flex-row items-center gap-x-1">
        <Link href={`/u/${user_id}`} onClick={stopPropagation}>
          <span className="flex items-center gap-x-1">
            <p className="hover:underline text-sm font-semibold">{username}</p>
            {followers > 2 && (
              <BadgeCheck fill="#38bdf8" className="text-white h-4 w-4 mt-1" />
            )}
          </span>
        </Link>
        <p className="text-secondaryicon text-xs mt-1">{date}</p>
      </section>
      <section>
        <Dropdown
          Icon={Ellipsis}
          options={options}
          iconClass="h-5 text-secondaryicon"
          position="left"
        />
      </section>
    </header>
  );
};

export default Header;
