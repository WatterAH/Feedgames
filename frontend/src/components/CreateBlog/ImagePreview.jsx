// ImagePreview.js
import React from "react";

export const ImagePreview = ({ preview }) => {
  return (
    preview && (
      <img
        src={preview}
        alt="Preview"
        className="rounded-lg object-cover h-full w-full mb-4"
      />
    )
  );
};
