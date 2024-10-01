import React, { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const LegalPoint: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-y-5">
      <h2 className="font-bold font-inter text-xl">{title}</h2>
      <ol className="flex flex-col gap-y-3">{children}</ol>
    </div>
  );
};

export default LegalPoint;
