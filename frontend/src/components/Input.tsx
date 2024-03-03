import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<Props> = (props) => {
  return (
    <input
      className="px-3 font-montserrat text-base md:text-sm py-2 outline-none border rounded-lg w-full dark:bg-neutral-700 dark:border-none dark:text-white"
      {...props}
    />
  );
};
