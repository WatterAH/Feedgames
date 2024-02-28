import React, { useState } from "react";
import { Input } from "../Input";
import { BackspaceIcon } from "@heroicons/react/24/outline";

interface Props {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CreateTags: React.FC<Props> = ({ setTags, tags }) => {
  const [tagsInput, setTagsInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTagsInput(inputValue);

    if (inputValue.includes(" ")) {
      if (inputValue == " ") {
        setTagsInput("");
        return;
      }
      const newTag = inputValue.trim();
      setTags([...tags, newTag]);
      setTagsInput("");
    }
  };

  const handleTagRemove = (indexToRemove: number) => {
    const updatedTags = tags.filter(
      (_: any, index: number) => index !== indexToRemove
    );
    setTags(updatedTags);
  };

  return (
    <section>
      <Input
        value={tagsInput}
        onChange={handleInputChange}
        placeholder="Separadas por espacios"
        type="text"
        maxLength={17}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-rubik tracking-wide uppercase"
          >
            {tag}
            <button
              className="ml-1"
              type="button"
              onClick={() => handleTagRemove(index)}
            >
              <BackspaceIcon aria-hidden="true" className="text-red-400 h-4" />
            </button>
          </span>
        ))}
      </div>
    </section>
  );
};
