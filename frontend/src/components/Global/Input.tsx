import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      className="px-3 font-montserrat text-base sm:text-xs py-2 outline-none border rounded-lg w-full"
      {...props}
    />
  );
};

export default Input;
