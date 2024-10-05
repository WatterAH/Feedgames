import React from "react";

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = (
  props
) => {
  return (
    <label {...props} className="mb-1 font-montserrat text-xs text-threads">
      {props.children}
    </label>
  );
};

export default Label;
