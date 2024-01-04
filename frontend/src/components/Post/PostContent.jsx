import React from "react";
export const PostContent = ({ data }) => {
  const { content } = data;
  return (
    <div className="flex flex-col gap-y-4">
      <p className="font-montserrat text-sm">{content}</p>
      {/* <img src={mc} alt="Minecraft Image" /> */}
    </div>
  );
};
