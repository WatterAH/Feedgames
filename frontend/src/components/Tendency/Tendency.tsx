import React, { useEffect, useState } from "react";
import { getTendencyPost } from "../../Api/suggestions";
import { LoadingPage } from "../LoadingPage";
import { TendencyPosts } from "./TendencyPosts";
import { PostInterface } from "../../interfaces/Post";

export const Tendency = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const tendencyPost = await getTendencyPost();
      setPosts(tendencyPost);
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  return (
    <section className="hidden max-w-xs md:block p-5">
      <p className="text-xl mb-5 font-montserrat dark:text-white">
        En tendencia
      </p>
      {loading ? (
        <LoadingPage />
      ) : error ? (
        <h1>No se pudieron cargar los posts.</h1>
      ) : (
        <TendencyPosts posts={posts} />
      )}
    </section>
  );
};
