import React from "react";

interface Props {
  color?: string;
}

const PageLoader: React.FC<Props> = ({ color = "black" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full h-10 w-10 border-${color} border-t-2`}
      ></div>
    </div>
  );
};

export default PageLoader;
