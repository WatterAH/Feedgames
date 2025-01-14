import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      className="px-3 placeholder-secondaryicon bg-background text-base sm:text-xs py-2 outline-none border border-border rounded-lg w-full text-text"
      {...props}
    />
  );
};

export default Input;
