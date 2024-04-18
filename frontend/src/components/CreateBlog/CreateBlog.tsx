import React, { useEffect, useState } from "react";
import { CreateBlogHeader } from "./CreateBlogHeader";
import { CreateBlogForm } from "./CreateBlogForm";
import { useUser } from "../../context/AuthContext";
import { createPost } from "../../Api/post";
import { useNavigate } from "react-router-dom";
import { MatchShowCase } from "../../interfaces/Valorant";
import { toast } from "sonner";

export const CreateBlog = () => {
  const nav = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [valMatch, setValMatch] = useState<MatchShowCase | null>(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (image) {
      setValMatch(null);
    }
  }, [image]);

  useEffect(() => {
    if (valMatch) {
      setImage("");
    }
  }, [valMatch]);

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createPost(user.id, content, tags, image, valMatch);
      nav("/");
    } catch (error: any) {
      const { message } = error;
      toast.error(message);
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
        formData={{ content, tags, valMatch, image }}
        alterFormData={{ setContent, setImage, setTags, setValMatch }}
      />
    </div>
  );
};
