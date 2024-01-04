import React from "react";

export const ProfileName = ({ name }) => {
  return (
    <span className="font-montserrat text-xs sm:text-sm md:text-base">
      {name}
    </span>
  );
};
