import React, { useState } from "react";
import Link from "next/link";
import Edit from "./Edit";
import { PostInterface } from "@/interfaces/Post";
import { interval } from "@/lib/date";
import { BadgeCheck } from "lucide-react";
import { stopPropagation } from "@/lib/utils";
import Options from "./Options";

interface Props {
  data: PostInterface;
  isLast?: boolean;
}

const Header: React.FC<Props> = ({ data }) => {
  const { id, user_id, user, order, edited } = data;
  const { username, followers } = user;
  const [editing, setEditing] = useState(false);
  const date = interval(order, "short");

  return (
    <>
      <div className="flex flex-row justify-between relative">
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
          <p className="text-(--placeholder) text-xs mt-1">{date}</p>
        </section>
        <div className="absolute right-1 -top-1 flex items-center">
          {edited && <p className="text-(--placeholder) text-xs">Editado</p>}
          <Options
            userId={user_id}
            postId={id}
            editCallback={() => setEditing(true)}
          />
        </div>
      </div>
      <Edit open={editing} setOpen={setEditing} post={data} />
    </>
  );
};

export default Header;
