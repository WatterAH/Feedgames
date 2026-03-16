import React from "react";

interface Props {
  title: string;
}

const Title: React.FC<Props> = ({ title }) => {
  return (
    <h3 className="font-semibold w-full max-w-3xl text-center h-[10%] text-text hidden md:block fixed pt-4 z-20 bg-background duration-500">
      {title}
    </h3>
  );
};

export default Title;
