import React, { useState } from "react";

export const TextArea = (props) => {
  const [contentLength, setContentLength] = useState(0);
  const maxLength = 1500;

  const handleTyping = (e) => {
    const newContent = e.target.value;
    if (newContent.length <= maxLength) {
      props.setContent(newContent);
      setContentLength(newContent.length);
    }
  };

  return (
    <div className="relative">
      <textarea
        placeholder="Escribe tu post aquí..."
        value={props.content}
        onChange={handleTyping}
        className="px-3 font-montserrat text-sm py-2 outline-none border rounded-md w-full h-64 resize-none"
      ></textarea>
      <p className="absolute right-2 bottom-2 text-sm text-gray-400">
        {contentLength}/{maxLength}
      </p>
    </div>
  );
};
