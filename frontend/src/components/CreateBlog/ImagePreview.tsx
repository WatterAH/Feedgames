import React from "react";

interface Props {
  preview: string | null | ArrayBuffer;
}

export const ImagePreview: React.FC<Props> = ({ preview }) => {
  return (
    preview && (
      <img
        src={typeof preview == "string" ? preview : undefined}
        alt="Preview"
        className="rounded-lg object-cover h-full w-full mb-4"
      />
    )
  );
};
