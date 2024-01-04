import React from "react";

export const Input = (props) => {
  return (
    <input
      className="px-3 font-montserrat text-sm py-2 outline-none border rounded-lg w-full file:bg-transparent file:text-sm file:border-0"
      {...props}
    />
  );
};
