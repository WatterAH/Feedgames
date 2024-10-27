import React from "react";
import { MatchShowCase } from "@/interfaces/Valorant";

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setPreview?: React.Dispatch<
    React.SetStateAction<string | MatchShowCase | null>
  >;
  pasteImages?: boolean;
  placeholder?: string;
}

const TextArea: React.FC<Props> = ({
  text,
  setText,
  setPreview,
  setImage,
  pasteImages = true,
  placeholder = "¿Qué hay en tu mente?",
}) => {
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardItems = e.clipboardData.items;

    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file && setPreview && setImage) {
          const url = URL.createObjectURL(file);
          setPreview(url);
          setImage(file);
        }
        break;
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <textarea
      value={text}
      onChange={handleTextChange}
      onPaste={pasteImages ? handlePaste : undefined}
      placeholder={placeholder}
      className="placeholder-secondaryicon outline-none w-full resize-none sm:text-sm bg-transparent overflow-hidden"
      rows={1}
    />
  );
};

export default TextArea;
