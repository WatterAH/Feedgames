import React from "react";

export const ProfileFollowers = ({ userData }) => {
  const { followers } = userData;
  return (
    <span className="text-xs font-montserrat py-1 px-2 rounded-full bg-gray-200">
      {followers.length} {followers.length == 1 ? "Seguidor" : "Seguidores"}
    </span>
  );
};
