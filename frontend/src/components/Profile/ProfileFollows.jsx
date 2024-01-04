import React from "react";

export const ProfileFollows = ({ userData }) => {
  const { followed } = userData;
  return (
    <span className="text-xs text-white font-montserrat py-1 px-2 rounded-full bg-cyan-700">
      {followed.length} {followed.length == 1 ? "Seguido" : "Seguidos"}
    </span>
  );
};
