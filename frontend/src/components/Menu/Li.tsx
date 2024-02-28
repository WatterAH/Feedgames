import React, { ReactNode } from "react";

export const Li = ({ children }: { children: ReactNode }) => {
  return (
    <li className="rounded-xl dark:text-white duration-500 font-montserrat flex items-center gap-x-2 p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:cursor-pointer">
      {children}
    </li>
  );
};
