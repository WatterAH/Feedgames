import React from "react";
import { Label } from "../Label";
import { toast } from "react-toastify";
import { isImage } from "../../functions/validator";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Match } from "../../interfaces/Valorant";

interface Props {
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  setPreview: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | Match | null>
  >;
}

export const ImageInput: React.FC<Props> = ({ setImage, setPreview }) => {
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if (!isImage(file)) {
      return toast.error("Solo se permiten imágenes", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setImage(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
      return;
    }
    return;
  };

  return (
    <div className="flex justify-center">
      <Label htmlFor="Image">
        <PhotoIcon
          aria-hidden="true"
          className="text-sky-400 h-6 hover:cursor-pointer"
        />
      </Label>
      <input
        onChange={handleImage}
        type="file"
        id="Image"
        className="hidden"
        accept="image/png, .jpeg, .jpg, image/gif"
      />
    </div>
  );
};
