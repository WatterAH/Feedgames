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
    <div className="w-full flex justify-center items-start lg:items-center h-screen mt-5 lg:ml-64 mb-32 lg:mb-0">
      <CreateBlog />
    </div>
  );
};
