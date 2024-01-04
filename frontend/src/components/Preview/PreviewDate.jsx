import React from "react";

export const PreviewDate = ({ post }) => {
  const { month, year } = post.created_at;
  return (
    <p>
      {month}, {year}
    </p>
  );
};
