import React, { useState } from "react";
import { useUser } from "../context/AuthContext";

export const TextArea = (props) => {
  const { user } = useUser();

  return (
    <div className="relative">
      <textarea
        placeholder={`¿Qué hay en tu mente ${user.name}?`}
        value={props.content}
        onChange={(e) => props.setContent(e.target.value)}
        className="font-montserrat text-sm outline-none w-full resize-none"
      ></textarea>
    </div>
  );
};
