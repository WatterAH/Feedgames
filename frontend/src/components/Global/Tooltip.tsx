import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  text: string;
}

const Tooltip: React.FC<Props> = ({ children, text }) => {
  return (
    <div className="relative group">
      {children}
      <div className="invisible opacity-0 bg-background text-text text-xs text-center whitespace-nowrap py-2 px-4 rounded absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 group-hover:visible group-hover:opacity-100 transition duration-300">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
