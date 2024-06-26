import React from "react";

interface Props {
  title: string;
  text: string;
}

export const ListItem: React.FC<Props> = ({ title, text }) => {
  return (
    <li className="flex flex-col gap-y-1">
      <h3 className="font-semibold font-inter">{title}</h3>
      <p className="text-gray-500">{text}</p>
    </li>
  );
};
