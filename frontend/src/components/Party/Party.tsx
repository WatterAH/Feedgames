import React from "react";
import { Party as PartyInterface } from "@/interfaces/Party";
import { interval } from "@/lib/date";
import Link from "next/link";
import Avatar from "./Avatar";

const Party: React.FC<PartyInterface> = (data) => {
  const { last_message, last_message_at, members } = data;
  const date = interval(last_message_at, "short");

  function getName() {
    if (data.name) return data.name;

    if (members.length === 1) {
      return members[0].name;
    } else {
      return members.map((member) => member.name).join(", ");
    }
  }

  return (
    <Link
      href={`/inbox/${data.id}`}
      className="flex items-center justify-between w-full py-3 px-5 hover:cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <Avatar {...data} />
        <div className="flex flex-col">
          <p className="font-semibold truncate max-w-xs">{getName()}</p>
          <p className="text-sm text-(--placeholder) truncate max-w-xs">
            {last_message ? last_message : "Nueva conversación"}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <p>...</p>
        <p className="text-sm text-(--placeholder)">{date}</p>
      </div>
    </Link>
  );
};

export default Party;
