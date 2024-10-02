import React from "react";

const Card: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center lg:pt-2 bg-white sm:rounded-t-3xl sm:shadow-md border h-screen max-w-2xl w-full overflow-y-auto scrollbar-none">
      {children}
    </div>
  );
};

export default Card;
