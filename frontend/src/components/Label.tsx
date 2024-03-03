import React from "react";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<Props> = (props) => {
  return (
    <label
      {...props}
      className="mb-1 font-montserrat text-xs dark:text-gray-200"
    >
      {props.children}
    </label>
  );
};
