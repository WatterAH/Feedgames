import React from "react";
import { Preview } from "../Preview/Preview";
import { PostInterface } from "../../interfaces/Post";

interface Props {
  savedList: PostInterface[];
}

export const MapSaved: React.FC<Props> = ({ savedList }) => {
  return (
    <section className="flex flex-wrap max-w-lg lg:px-3 justify-center mx-auto gap-2">
      {savedList.map((saved, index) => (
        <Preview key={index} post={saved} />
      ))}
    </section>
  );
};
