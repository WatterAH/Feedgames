import React, { useState } from "react";
import Link from "next/link";
import Edit from "./Edit";
import Dropdown from "../Global/Dropdown";
import { PostInterface } from "@/interfaces/Post";
import { calculateDate } from "@/functions/date";
import { BadgeCheck, Ellipsis } from "lucide-react";
import { stopPropagation } from "@/functions/utils";
import { usePostOptions } from "@/hooks/useOptions";

interface Props {
  data: PostInterface;
  isLast?: boolean;
}

const Header: React.FC<Props> = ({ data, isLast }) => {
  const { id, user_id, user, order, edited } = data;
  const { username, followers } = user;
  const date = calculateDate(order);
  const [editing, setEditing] = useState(false);
  const options = usePostOptions(id, user_id, setEditing);

  return (
    <>
      <header className="flex flex-row justify-between relative">
        <section className="flex flex-row items-center gap-x-1">
          <Link href={`/u/${user_id}`} onClick={stopPropagation}>
            <span className="flex items-center gap-x-1">
              <p className="hover:underline text-sm font-semibold">
                {username}
              </p>
              {followers > 2 && (
                <BadgeCheck
                  fill="#38bdf8"
                  className="text-white h-4 w-4 mt-1"
                />
              )}
            </span>
          </Link>
          <p className="text-placeholder text-xs mt-1">{date}</p>
        </section>
        <section>
          <div className="absolute right-1 -top-1 flex items-center">
            {edited && <p className="text-placeholder text-xs">Editado</p>}
            <Dropdown
              Icon={Ellipsis}
              options={options}
              iconClass="h-5 text-placeholder"
              position={isLast ? "top_left" : "left"}
            />
          </div>
        </section>
      </header>
      <Edit open={editing} setOpen={setEditing} post={data} />
    </>
  );
};

export default Header;
