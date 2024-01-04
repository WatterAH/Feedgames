import React, { useEffect, useState } from "react";
import { Feed } from "./Feed";
import { Search } from "../components/Search/Search";
import { Preview } from "../components/Preview/Preview";
import { toast } from "react-toastify";
import { LoadingPage } from "../components/LoadingPage";
import { getTendencyPost } from "../Api/suggestions";

export const MainFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const tendencyPost = await getTendencyPost();
      setPosts(tendencyPost);
    } catch (error) {
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
    <>
      <section className="flex-1 flex-col h-full max-w-2xl lg:ml-64">
        <Search></Search>
        <Feed></Feed>
      </section>
      <section className="hidden md:block p-5">
        <p className="text-xl mb-5 font-montserrat">En tendencia</p>
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="flex flex-col gap-y-4">
            {posts.map((post) => (
              <Preview key={post.id} post={post} notSave={true} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};
