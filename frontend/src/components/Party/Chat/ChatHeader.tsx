import React, { useEffect } from "react";
import Avatar from "../Avatar";
import { Party } from "@/interfaces/Party";

interface Props extends Party {}

const ChatHeader: React.FC<Props> = (party) => {
  const { name, members } = party;

  function getName() {
    if (name) return name;
    if (members.length === 1) {
      return members[0].name;
    }
    return members.map((member) => member.name).join(", ");
  }

  return (
    <div className="border-b md pb-4 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Avatar {...party} />
        <div className="">
          <h2 className="ml-4 font-semibold">{getName()}</h2>
          <p className="ml-4 text-sm text-(--placeholder)">
            {members.length + 1} miembros
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
