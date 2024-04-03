import React, { useEffect, useState } from "react";
import { Search } from "../components/Search/Search";
import { Tendency } from "../components/Tendency/Tendency";
import { PostInterface } from "../interfaces/Post";
import { fetchPosts } from "../api/post";
import { useUser } from "../Context/AuthContext";
import { ErrorPage } from "../components/ErrorPage";
import { MapPost } from "./MapPost";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { getExpirationDate } from "../functions/date";

export const MainFeed = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [_cookies, setCookie] = useCookies();
  const urlParams = new URLSearchParams(window.location.search);
  const riotToken = urlParams.get("riotToken");
  const nav = useNavigate();

  const handleFeed = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts(user.id);
      setPosts((prevPost) => [...prevPost, ...data]);
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (riotToken) {
      setCookie("riotToken", riotToken, {
        path: "/",
        expires: getExpirationDate(),
        secure: true,
        sameSite: "none",
      });
      nav("/");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (user.id) {
      handleFeed();
    }
  }, [user.id]);

  return (
    <div
      className={`flex justify-between w-full ${
        loading ? "h-screen" : "h-full"
      }`}
    >
      <section className="flex-1 flex-col max-w-xl lg:ml-72">
        <Search />
        {error ? (
          <ErrorPage />
        ) : (
          <MapPost posts={posts} loading={loading} setPosts={setPosts} />
        )}
      </section>
      <Tendency />
    </div>
  );
};
