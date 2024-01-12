import React, { useState } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "../Label";
import { toast } from "react-toastify";
import { ImagePreview } from "./ImagePreview";

export const ImageInput = ({ setImage }) => {
  const [preview, setPreview] = useState(null);
  const extensionList = ["jpg", "jpeg", "gif", "png", "webp"];

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let extension = file.name.split(".").pop().toLowerCase();
    const isImage = extensionList.indexOf(extension) == -1 ? false : true;
    if (!isImage) {
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
    }
  };

  return (
    <span>
      <div className="overflow-y-auto max-h-32 lg:max-h-40 mb-4 w-full flex justify-center">
        <ImagePreview preview={preview} />
      </div>
      <div className="flex justify-center">
        <Label htmlFor="Image">
          <FontAwesomeIcon
            icon={faImage}
            className="text-sky-400 h-5 hover:cursor-pointer"
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
    </span>
  );
};
