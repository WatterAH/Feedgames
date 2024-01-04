import React from "react";

export const Li = ({ props, children }) => {
  return (
    <a className="hover:cursor-pointer">
      <li
        {...props}
        className="rounded-xl dark:text-white duration-500 font-montserrat flex items-center gap-x-3 p-3 hover:bg-gray-100 dark:hover:bg-neutral-800"
      >
        {children}
      </li>
    </a>
  );
};
