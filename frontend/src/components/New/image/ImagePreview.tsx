import React from "react";

interface Props {
  image: string | null | ArrayBuffer;
}

const ImagePreview: React.FC<Props> = ({ image }) => {
  return (
    <img
      src={image as string}
      alt="Preview"
      className="rounded-lg shadow-lg object-cover h-96 w-full"
    />
  );
};

export default ImagePreview;
