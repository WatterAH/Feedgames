import React from "react";

export const Button = (props) => {
  return (
    <button
      {...props}
      className="p-2 h-10 bg-cyan-700 rounded-lg text-white w-full font-montserrat"
    >
      {props.children}
    </button>
  );
};
