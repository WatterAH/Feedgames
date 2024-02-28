import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<Props> = (props) => {
  return (
    <input
      className="px-3 font-montserrat text-base md:text-sm py-2 outline-none border rounded-lg w-full"
      {...props}
    />
  );
};
