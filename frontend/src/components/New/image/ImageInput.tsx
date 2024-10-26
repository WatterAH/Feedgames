import React from "react";
import { toast } from "sonner";
import { isImage } from "@/functions/utils";
import { MatchShowCase } from "@/interfaces/Valorant";
import { Image as ImageIcon } from "lucide-react";

interface Props {
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setPreview: React.Dispatch<
    React.SetStateAction<string | MatchShowCase | null>
  >;
}

const ImageInput: React.FC<Props> = ({ setImage, setPreview }) => {
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!isImage(file)) return toast.warning("Solo se permiten imágenes");

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (!(reader.result instanceof ArrayBuffer)) {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
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
