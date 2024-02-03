import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTendencyPost } from "../../Api/suggestions";
import { LoadingPage } from "../LoadingPage";
import { TendencyPosts } from "./TendencyPosts";
import { PostInterface } from "../../interfaces/Post";

export const Tendency = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const tendencyPost = await getTendencyPost();
      setPosts(tendencyPost);
    } catch (error: any) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  return (
    <section className="hidden max-w-xs md:block p-5">
      <p className="text-xl mb-5 font-montserrat">En tendencia</p>
      {loading ? <LoadingPage /> : <TendencyPosts posts={posts} />}
    </section>
  );
};
