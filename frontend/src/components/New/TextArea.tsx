import React, { useEffect, useRef } from "react";
import { MatchShowCase } from "@/interfaces/Valorant";

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setPreview?: React.Dispatch<
    React.SetStateAction<string | MatchShowCase | null>
  >;
  pasteImages?: boolean;
}

const TextArea: React.FC<Props> = ({
  text,
  setText,
  setPreview,
  setImage,
  pasteImages = true,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        70
      )}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={handleInput}
      onPaste={pasteImages ? handlePaste : undefined}
      placeholder="¿Qué hay en tu mente?"
      className="font-montserrat outline-none w-full resize-none sm:text-xs scrollbar-thin"
      rows={1}
      style={{ maxHeight: "200px", overflowY: "auto" }}
    />
  );
};

export default TextArea;
