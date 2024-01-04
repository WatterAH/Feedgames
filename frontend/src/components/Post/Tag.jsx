import React from "react";

export const Tag = ({ text }) => {
  return (
    <span className="inline-block bg-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs font-rubik tracking-wide uppercase">
      {text}
    </span>
  );
};
