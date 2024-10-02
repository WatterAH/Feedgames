import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  loading: boolean;
}

const Card: React.FC<Props> = ({ children, loading }) => {
  return (
    <div
      className={`flex flex-col ${
        loading && "justify-center items-center"
      } lg:pt-2 bg-white sm:rounded-t-3xl sm:shadow-md border h-screen max-w-2xl w-full overflow-y-auto scrollbar-none`}
    >
      {children}
    </div>
  );
};

export default Card;
