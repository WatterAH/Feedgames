import React, { useState } from "react";
import { CreateBlogHeader } from "./CreateBlogHeader";
import { CreateBlogForm } from "./CreateBlogForm";
import { useUser } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { createPost } from "../../Api/post";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
  const nav = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createPost(user.id, content, tags, image);
      nav("/");
    } catch (error: any) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-6 sm:shadow-lg sm:border w-full max-w-md rounded-lg">
      <CreateBlogHeader />
      <CreateBlogForm
        loading={loading}
        handlePost={handlePost}
        formData={{ content, tags }}
        alterFormData={{ setContent, setImage, setTags }}
      />
      <ToastContainer />
    </div>
  );
};
