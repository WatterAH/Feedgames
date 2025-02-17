import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      {...props}
      className="py-2 px-6 h-9 text-sm flex justify-center bg-text rounded-xl text-foreground w-full font-inter disabled:cursor-not-allowed disabled:bg-background"
    >
      {props.children}
    </button>
  );
};

export default Button;
