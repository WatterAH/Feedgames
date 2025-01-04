import React from "react";
import ImagePreview from "../image/ImagePreview";
import MatchPost from "@/components/Post/contents/Match";
import { X } from "lucide-react";
import { MatchShowCase } from "@/interfaces/Valorant";

interface Props {
  preview: string | MatchShowCase | null;
  setPreview: React.Dispatch<
    React.SetStateAction<string | MatchShowCase | null>
  >;
  showsClose?: boolean;
}

const Preview: React.FC<Props> = ({
  preview,
  setPreview,
  showsClose = true,
}) => {
  const cases = (preview: string | MatchShowCase | null) => {
    if (preview == null) return <span></span>;
    else if (typeof preview == "string")
      return <ImagePreview image={preview} />;
    else if (preview instanceof ArrayBuffer) return;
    else if (preview) return <MatchPost stats={preview} />;
  };

  return (
    <div
      className={`p-1 max-h-full object-cover relative pr-5 ${
        preview && "mb-3"
      }`}
    >
      {preview && showsClose && (
        <div
          className="absolute z-30 rounded-full bg-gray-100 right-7 top-3 hover:cursor-pointer p-1"
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
