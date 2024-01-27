import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PostDate: React.FC<Props> = ({ children }) => {
  return <p className="text-gray-400 text-xs font-rubik">{children}</p>;
};
