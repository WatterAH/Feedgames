import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<Props> = (props) => {
  return (
    <input
      className="px-3 font-montserrat text-base sm:text-xs py-2 outline-none border rounded-lg w-full"
      {...props}
    />
  );
};

export default Input;
