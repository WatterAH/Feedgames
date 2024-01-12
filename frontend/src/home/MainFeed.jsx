import React from "react";
import { Feed } from "./Feed";
import { Search } from "../components/Search/Search";
import { Tendency } from "../components/Tendency/Tendency";

export const MainFeed = () => {
  return (
    <div className="flex justify-between w-full">
      <section className="flex-1 flex-col h-full max-w-4xl lg:ml-64">
        <Search />
        <Feed />
      </section>
      <Tendency />
    </div>
  );
};
