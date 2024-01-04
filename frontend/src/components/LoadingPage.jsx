import React from "react";

export const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-black dark:border-white border-t-2"></div>
    </div>
  );
};
