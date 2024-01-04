import React from "react";

export const Label = (props) => {
  return (
    <label {...props} className="mb-1 font-montserrat text-xs">
      {props.children}
    </label>
  );
};
