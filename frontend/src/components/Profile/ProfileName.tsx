import React from "react";

interface Props {
  name: string;
}

export const ProfileName: React.FC<Props> = ({ name }) => {
  return (
    <span className="font-montserrat text-xs sm:text-sm md:text-base">
      {name}
    </span>
  );
};
