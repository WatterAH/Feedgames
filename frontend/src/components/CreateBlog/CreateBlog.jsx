import React, { useState } from "react";
import { CreateBlogHeader } from "./CreateBlogHeader";
import { CreateBlogForm } from "./CreateBlogForm";
import { useUser } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { createPost, uploadImage } from "../../Api/post";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
  const nav = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      let publicUrl;
      setLoading(true);
      if (image) {
        const { data, error } = await uploadImage(image);
        if (error) {
          throw new Error("No se pudo subir la imagen");
        }
        publicUrl = data.publicUrl;
      }
      await createPost(user.id, content, tags, publicUrl);
      nav("/");
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
    <div className="flex flex-col gap-y-6 shadow-lg border w-full max-w-md rounded-lg">
      <CreateBlogHeader />
      <CreateBlogForm
        loading={{ loading }}
        handlePost={handlePost}
        formData={{ content, image, tags }}
        alterFormData={{ setContent, setImage, setTags }}
      />
      <ToastContainer />
    </div>
  );
};
