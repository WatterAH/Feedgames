import React from "react";
import { toast } from "sonner";
import { isImage } from "@/functions/utils";
import { Image as ImageIcon } from "lucide-react";
import { ContentObject } from "../Create";

interface Props {
  setContent: (content: ContentObject) => void;
}

const ImageInput: React.FC<Props> = ({ setContent }) => {
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!isImage(file)) return toast.warning("Solo se permiten imágenes");

    setContent({ type: "image", data: file });
  };

  return (
    <div>
      <label htmlFor="img">
        <ImageIcon className="text-secondaryicon h-5 hover:cursor-pointer" />
      </label>
      <input
        id="img"
        type="file"
        onChange={handleImage}
        className="hidden"
        accept=".png, .jpeg, .jpg, .gif, .webp"
      />
    </div>
  );
};

export default ImageInput;
