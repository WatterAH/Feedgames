import React, { ReactNode } from "react";

export const CommentText = ({ children }: { children: ReactNode }) => {
  return <p className="text-gray-700 text-sm dark:text-gray-200">{children}</p>;
};
