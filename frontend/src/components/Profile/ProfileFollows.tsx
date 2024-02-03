import React from "react";
import { User } from "../../interfaces/User";

export const ProfileFollows = ({ userData }: { userData: User }) => {
  const { followed } = userData;
  return (
    <span className="text-xs text-white font-montserrat py-1 px-2 rounded-full bg-teal-800">
      {followed.length} {followed.length == 1 ? "Seguido" : "Seguidos"}
    </span>
  );
};
