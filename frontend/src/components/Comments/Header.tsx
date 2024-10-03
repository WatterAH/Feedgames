import React from "react";
import Link from "next/link";
import { calculateDate } from "@/functions/date";
import { CommentInterface } from "@/interfaces/Comment";

interface Props {
  data: CommentInterface;
}

const Header: React.FC<Props> = ({ data }) => {
  const { user, order, id_user } = data;
  const { username } = user;
  const date = calculateDate(order);

  return (
    <header className="flex flex-row justify-between">
      <section className="flex flex-row items-center gap-x-1">
        <Link href={`/u/${id_user}`}>
          <p className="hover:underline text-sm font-semibold">{username}</p>
        </Link>
        <p className="text-gray-400 text-xs mt-1">{date}</p>
      </section>
    </header>
  );
};

export default Header;
