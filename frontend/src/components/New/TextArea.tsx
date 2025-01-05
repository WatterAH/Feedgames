import React from "react";
import { ContentObject } from "./Create";

interface Props {
  text: string;
  setText: (text: string) => void;
  setContent?: (content: ContentObject) => void;
  pasteImages?: boolean;
  placeholder?: string;
}

const TextArea: React.FC<Props> = ({
  text,
  setText,
  setContent,
  pasteImages = true,
  placeholder = "¿Qué hay en tu mente?",
}) => {
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardItems = e.clipboardData.items;

    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file && setContent) {
          setContent({ type: "image", data: file });
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
