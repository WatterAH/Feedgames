import React from "react";

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = (
  props
) => {
  return (
    <label
      {...props}
      className="mb-1 font-montserrat font-medium text-xs text-text text-start"
    >
      {props.children}
    </label>
  );
};

export default Label;
