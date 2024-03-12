import React, { useEffect } from "react";
import { CreateBlog } from "./CreateBlog";

export const Create = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="w-full flex justify-center items-start lg:items-center h-screen lg:ml-64 mb-12 lg:mb-0">
      <CreateBlog />
    </div>
  );
};
