import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props,
) => {
  return (
    <input
      className="px-3 placeholder-(--placeholder) bg-(--background) text-base sm:text-sm py-2 outline-none border border-(--border) rounded-2xl w-full text-(--text) font-inter"
      {...props}
    />
  );
};

export default Input;
