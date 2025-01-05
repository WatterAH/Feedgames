import React from "react";
import ImagePreview from "../image/ImagePreview";
import MatchPost from "@/components/Post/contents/Match";
import { X } from "lucide-react";
import { ContentObject } from "../Create";

interface Props {
  content: ContentObject;
  setContent: (content: ContentObject) => void;
  showsClose?: boolean;
}

const Preview: React.FC<Props> = ({
  content,
  setContent,
  showsClose = true,
}) => {
  const cases = (content: ContentObject) => {
    if (content == null) return;
    if (content.type == "image") return <ImagePreview image={content.data} />;
    if (content.type == "valorant") return <MatchPost stats={content.data} />;
  };

  return (
    <div
      className={`p-1 max-h-full object-cover relative pr-5 ${
        content && "mb-3"
      }`}
    >
      {content && showsClose && (
        <div
          className="absolute z-30 rounded-full bg-gray-100 right-7 top-3 hover:cursor-pointer p-1"
          onClick={() => setContent(null)}
        >
          <X className="text-threads" />
        </div>
      )}
      {cases(content)}
    </div>
  );
};

export default Preview;
