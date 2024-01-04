import React, { useState } from "react";
import { Input } from "../Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

export const CreateTags = (props) => {
  const [tagsInput, setTagsInput] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setTagsInput(inputValue);

    if (inputValue.includes(" ")) {
      if (inputValue == " ") {
        setTagsInput("");
        return;
      }
      const newTag = inputValue.trim();
      props.setTags([...props.tags, newTag]);
      setTagsInput("");
    }
  };

  const handleTagRemove = (indexToRemove) => {
    const updatedTags = props.tags.filter(
      (_, index) => index !== indexToRemove
    );
    props.setTags(updatedTags);
  };

  return (
    <section>
      <Input
        value={tagsInput}
        onChange={handleInputChange}
        placeholder="Separadas por espacios"
        type="text"
        maxLength="17"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {props.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs font-rubik tracking-wide uppercase"
          >
            {tag}
            <button
              className="ml-1"
              type="button"
              onClick={() => handleTagRemove(index)}
            >
              <FontAwesomeIcon
                className="text-red-400 h-3"
                icon={faDeleteLeft}
              />
            </button>
          </span>
        ))}
      </div>
    </section>
  );
};
