import React from "react";
import { Preview } from "../Preview/Preview";

export const MapSaved = ({ savedList }) => {
  return (
    <section className="flex flex-wrap max-w-lg lg:px-3 justify-center mx-auto gap-2">
      {savedList.map((saved, index) => (
        <Preview key={index} post={saved} savedButton={true} />
      ))}
    </section>
  );
};
