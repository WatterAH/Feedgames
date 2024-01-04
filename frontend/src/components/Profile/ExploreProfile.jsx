import React from "react";
import { Profile } from "./Profile";

export const ExploreProfile = ({ id }) => {
  return (
    <div className="lg:ml-64 px-3 w-full">
      <Profile id={id} />
    </div>
  );
};
