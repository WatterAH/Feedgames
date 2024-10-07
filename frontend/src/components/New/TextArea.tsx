import React, { useEffect, useRef } from "react";

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextArea: React.FC<Props> = ({ text, setText }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        250
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
      placeholder="¿Qué hay en tu mente?"
      className="font-montserrat outline-none w-full resize-none sm:text-xs h-24 scrollbar-thin"
      rows={1}
      style={{ maxHeight: "200px", overflowY: "auto" }}
    />
  );
};

export default TextArea;
