import React from "react";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label: React.FC<Props> = (props) => {
  return (
    <label {...props} className="mb-1 font-raleway text-xs">
      {props.children}
    </label>
  );
};

export default Label;
