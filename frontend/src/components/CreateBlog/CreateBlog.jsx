import React, { useState } from "react";
import { CreateBlogHeader } from "./CreateBlogHeader";
import { CreateBlogForm } from "./CreateBlogForm";
import { useUser } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { displayContent } from "../../home/Home";
import { createPost } from "../../Api/post";

export const CreateBlog = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createPost(user.id, title, content, tags);
      displayContent("Feed");
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-9 p-2 md:p-9 rounded-lg border-none md:border shadow-sm w-full lg:w-2/3 mb-10">
      <CreateBlogHeader />
      <CreateBlogForm
        loading={{ loading }}
        handlePost={handlePost}
        formData={{ title, content, image, tags }}
        alterFormData={{ setTitle, setContent, setImage, setTags }}
      />
      <ToastContainer />
    </div>
  );
};
