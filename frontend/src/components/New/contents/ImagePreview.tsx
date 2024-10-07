import React from "react";

interface Props {
  image: string | null | ArrayBuffer;
}

const ImagePreview: React.FC<Props> = ({ image }) => {
  return (
    <img
      src={image as string}
      alt="Preview"
      className="rounded-lg object-cover h-full w-full mb-4"
    />
  );
};

export default ImagePreview;
