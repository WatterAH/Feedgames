import React from "react";
import icon from "../assets/img/icon.ico";

export const Header = () => {
  return (
    <header className="flex justify-center items-center mb-4">
      <section className="flex items-center gap-x-2">
        <img src={icon} alt="logo" className="h-10 w-10" />
        <h1 className="text-4xl font-kalnia">Feedgames</h1>
      </section>
    </header>
  );
};
