import React from "react";
import Options from "../Global/Options";
import Link from "next/link";
import { PostInterface } from "@/interfaces/Post";
import { calculateDate } from "@/functions/date";
import { postOptions } from "@/constants/postOptions";
import { useUser } from "@/context/AuthContext";
import { Ellipsis } from "lucide-react";
import { stopPropagation } from "@/functions/utils";

interface Props {
  data: PostInterface;
}

const Header: React.FC<Props> = ({ data }) => {
  const { id, user_id, user, order } = data;
  const { username } = user;
  const { user: session } = useUser();
  const date = calculateDate(order);
  const options = postOptions(id, user_id, session, () => {});

  return (
    <header className="flex flex-row justify-between">
      <section className="flex flex-row items-center gap-x-1">
        <Link href={`/u/${user_id}`} onClick={stopPropagation}>
          <p className="hover:underline text-sm font-semibold">{username}</p>
        </Link>
        <p className="text-gray-400 text-xs mt-1">{date}</p>
      </section>
      <section>
        <Options
          Icon_options={Ellipsis}
          className="h-5 text-gray-500"
          options={options}
        />
      </section>
    </header>
  );
};

export default Header;
