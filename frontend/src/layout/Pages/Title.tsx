import React from "react";

interface Props {
  title: string;
}

const Title: React.FC<Props> = ({ title }) => {
  return (
    <h3 className="font-semibold w-full max-w-3xl text-center h-[10%] text-threads dark:text-white hidden md:block fixed pt-4 z-20 bg-barcelona dark:bg-coal">
      {title}
    </h3>
  );
};

export default Title;
