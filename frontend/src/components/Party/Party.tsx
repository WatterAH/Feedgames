import React from "react";
import { Party as PartyInterface } from "@/interfaces/Party";
import Link from "next/link";
import Avatar from "./Avatar";
import { format } from "date-fns";
import { useUser } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const Party: React.FC<PartyInterface> = (data) => {
  const { user } = useUser();
  const { last_message, members } = data;
  const { created_at } = last_message;

  function getName() {
    if (data.name) return data.name;

    if (members.length === 1) {
      return members[0].name;
    } else {
      return members.map((member) => member.name).join(", ");
    }
  }

  function isUnread() {
    const member = data.me;
    if (!member) return false;

    if (data.last_message.user?.id === user.id) return false;

    const lastMessage = new Date(data.last_message.created_at).getTime();
    const lastRead = new Date(member.last_read_at).getTime();

    return lastMessage > lastRead;
  }

  return (
    <Link
      href={`/party/${data.id}`}
      className="flex items-center justify-between w-full py-3 px-5 hover:cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <Avatar {...data} />
        <div className="flex flex-col">
          <p className={cn("truncate max-w-xs", isUnread() && "font-bold")}>
            {getName()}
          </p>
          <p
            className={cn(
              "text-sm text-(--placeholder) truncate max-w-xs",
              isUnread() && "font-bold",
            )}
          >
            {last_message.user &&
              (last_message.user.id === user.id ? (
                <span className="font-medium">Tú:</span>
              ) : (
                <span className="font-medium">{last_message.user.name}:</span>
              ))}{" "}
            {last_message.content}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-between items-end h-full">
        <p className="text-sm text-(--placeholder)">
          {format(created_at, "HH:mm")}
        </p>
        {isUnread() && (
          <div className="rounded-full size-2 bg-(--text) mx-auto" />
        )}
      </div>
    </Link>
  );
};

export default Party;
