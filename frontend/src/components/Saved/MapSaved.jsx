import React from "react";
import { Preview } from "../Preview/Preview";

export const MapSaved = ({ savedList }) => {
  return (
    <section className="flex gap-2 px-4 flex-wrap w-full justify-center lg:justify-normal">
      {savedList.map((saved, index) => (
        <Preview key={index} post={saved} savedButton={true} />
      ))}
    </section>
  );
};
