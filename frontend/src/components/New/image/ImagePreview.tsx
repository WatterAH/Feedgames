import React, { useEffect, useState } from "react";

interface Props {
  image: File;
}

const ImagePreview: React.FC<Props> = ({ image }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(image);
    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);

  return (
    <img
      src={imageUrl ?? undefined}
      alt="Preview"
      className="rounded-lg shadow-lg object-cover h-96 w-full"
    />
  );
};

export default ImagePreview;
