import React from "react";
import { User } from "../../interfaces/User";

export const ProfileFollowers = ({ userData }: { userData: User }) => {
  const { followers } = userData;
  return (
    <span className="text-xs font-montserrat py-1 px-2 rounded-full bg-gray-200">
      {followers.length} {followers.length == 1 ? "Seguidor" : "Seguidores"}
    </span>
  );
};
