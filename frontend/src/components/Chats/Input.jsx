import React from "react";

export const Input = (props) => {
  return (
    <input
      type="text"
      placeholder="Escribe un mensaje"
      className="w-full py-2 px-3 rounded-full text-sm font-montserrat outline-none border"
      {...props}
    />
  );
};
