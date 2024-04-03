import React from "react";
import { useUser } from "../context/AuthContext";

interface Props {
  setContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  content: string;
}

export const TextArea: React.FC<Props> = ({ content, setContent }) => {
  const { user } = useUser();

  return (
    <div className="relative">
      <textarea
        placeholder={`¿Qué hay en tu mente ${user?.name}?`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="font-montserrat outline-none w-full resize-none dark:bg-black dark:text-white"
      ></textarea>
    </div>
  );
};
