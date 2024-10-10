import React from "react";
import ImagePreview from "./contents/ImagePreview";
import MatchPost from "@/components/Post/contents/Match";
import { X } from "lucide-react";
import { MatchShowCase } from "@/interfaces/Valorant";

interface Props {
  preview: string | ArrayBuffer | MatchShowCase | null;
  setPreview: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | MatchShowCase | null>
  >;
}

const Preview: React.FC<Props> = ({ preview, setPreview }) => {
  const cases = (preview: string | ArrayBuffer | MatchShowCase | null) => {
    if (preview == null) return <span></span>;
    else if (typeof preview == "string")
      return <ImagePreview image={preview} />;
    else if (preview instanceof ArrayBuffer) return;
    else if (preview) return <MatchPost stats={preview} />;
  };

  return (
    <div className="p-2 relative">
      {preview && (
        <div
          className="absolute rounded-full bg-gray-100 right-3 top-3 hover:cursor-pointer p-1"
          onClick={() => setPreview(null)}
        >
          <X className="text-threads" />
        </div>
      )}
      {cases(preview)}
    </div>
  );
};

export default Preview;
