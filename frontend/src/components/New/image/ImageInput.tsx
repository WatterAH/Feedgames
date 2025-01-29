import React from "react";
import { handleImageChange } from "@/functions/utils";
import { Image as ImageIcon } from "lucide-react";
import { ContentObject } from "@/interfaces/Post";

interface Props {
  setContent: (content: ContentObject) => void;
}

const ImageInput: React.FC<Props> = ({ setContent }) => {
  const handleImage = (file: File) => {
    setContent({ type: "image", data: file });
  };

  return (
    <div>
      <label htmlFor="img">
        <ImageIcon className="text-placeholder h-5 hover:cursor-pointer" />
      </label>
      <input
        id="img"
        type="file"
        onChange={(e) => handleImageChange(e, handleImage)}
        className="hidden"
        accept=".png, .jpeg, .jpg, .gif, .webp"
      />
    </div>
  );
};

export default ImageInput;
