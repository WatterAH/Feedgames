import React from "react";
import { Match } from "../../interfaces/Valorant";
import { MatchPost } from "../Post/Match";

interface ImageProps {
  image: string | null | ArrayBuffer;
}
export const ImagePreview: React.FC<ImageProps> = ({ image }) => {
  return (
    <img
      src={image as string}
      alt="Preview"
      className="rounded-lg object-cover h-full w-full mb-4"
    />
  );
};

interface Props {
  preview: string | ArrayBuffer | Match | null;
}

export const Preview: React.FC<Props> = ({ preview }) => {
  const cases = (preview: string | ArrayBuffer | Match | null) => {
    if (preview == null) {
      return <span></span>;
    } else if (typeof preview == "string") {
      return <ImagePreview image={preview} />;
    } else if (preview instanceof ArrayBuffer) {
      return <span></span>;
    } else if (preview) {
      return <MatchPost match={preview} />;
    } else {
      return <span></span>;
    }
  };
  return (
    <div className="overflow-y-auto max-h-32 lg:max-h-40 mb-4 w-full flex justify-center">
      {cases(preview)}
    </div>
  );
};
