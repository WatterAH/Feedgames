import React from "react";
import Image from "next/image";

interface Props {
  picture: string;
  handleImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput: React.FC<Props> = ({ picture, handleImage }) => {
  return (
    <>
      <label
        htmlFor="img"
        className="text-text w-fit font-medium flex flex-col items-center gap-y-2 hover:cursor-pointer"
      >
        <div className="rounded-full relative h-20 w-20 bg-loading">
          <Image
            src={picture}
            alt=""
            fill
            priority
            className="object-cover cursor-pointer rounded-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        Cambiar foto
      </label>
      <input
        id="img"
        onChange={handleImage}
        type="file"
        accept=".png, .jpeg, .jpg, .gif, .webp"
        className="hidden"
      />
    </>
  );
};

export default ImageInput;
