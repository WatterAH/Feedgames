import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      {...props}
      className="p-2 h-9 text-sm flex justify-center bg-threads rounded-lg text-white w-full font-montserrat disabled:cursor-not-allowed disabled:bg-neutral-200"
    >
      {props.children}
    </button>
  );
};

export default Button;
