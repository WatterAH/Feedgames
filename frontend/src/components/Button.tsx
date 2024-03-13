import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: React.FC<Props> = (props) => {
  return (
    <button
      {...props}
      className="p-2 h-10 text-sm bg-neutral-600 rounded-lg text-white w-full font-montserrat disabled:cursor-not-allowed disabled:bg-neutral-200"
    >
      {props.children}
    </button>
  );
};
