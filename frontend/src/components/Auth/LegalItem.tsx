import React from "react";

interface Props {
  title: string;
  text: string;
}

const LegalItem: React.FC<Props> = ({ title, text }) => {
  return (
    <li className="flex flex-col gap-y-1">
      <h3 className="font-semibold font-inter text-text">{title}</h3>
      <p className="text-text">{text}</p>
    </li>
  );
};

export default LegalItem;
