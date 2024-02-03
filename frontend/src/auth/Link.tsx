import React, { useState } from "react";
import { Modal } from "./Modal";

interface Props {
  text: string;
  content: string;
}

export const Link: React.FC<Props> = ({ text, content }) => {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button onClick={openModal} className="text-xs text-gray-400">
        {text}
      </button>
      <Modal closeModal={closeModal} isOpen={isOpen} content={content} />
    </>
  );
};
