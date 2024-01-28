import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Menu } from "../components/Menu/Menu";
import { MainFeed } from "./MainFeed";
import { Create } from "../components/CreateBlog/Create";
import { Saved } from "../components/Saved/Saved";
import { useUser } from "../context/AuthContext";
import { checkAuth } from "../Api/auth";
import { LoadingPage } from "../components/LoadingPage";
import { ExploreComment } from "../components/Comment/ExploreComment";
import { ExplorePost } from "../components/Post/ExplorePost";
import { Profile } from "../components/Profile/Profile";
import { Direct } from "../components/Chats/Direct";
import { URL } from "../App";

export let socket;

export const Home = () => {
  const nav = useNavigate();
  const { login } = useUser();
  const [loading, setLoading] = useState(false);

  const handleToken = async () => {
    try {
      setLoading(true);
      const data = await checkAuth();
      login(data);
      socket = io(URL);
    } catch (error) {
      nav("/auth");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  return loading ? (
    <div className="h-screen flex items-center justify-center">
      <LoadingPage />
    </div>
  ) : (
    <div className="flex relative dark:bg-black duration-500">
      <section className="lg:w-64 w-full bottom-0 lg:top-0 py-6 px-3 fixed bg-white dark:bg-black duration-500 lg:border-r border-t lg:border-t-0 z-10">
        <h2 className="text-3xl text-gray-900 dark:text-white duration-500 font-bold font-kalnia hidden lg:block">
          Feedgames
        </h2>
        <Menu />
      </section>
      <Routes>
        <Route path="*" element={<MainFeed />} />
        <Route path="/" element={<MainFeed />} />
        <Route path="/create" element={<Create />} />
        <Route path="/r/:id" element={<Direct />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/post/:id" element={<ExplorePost />} />
        <Route path="/comment/:id" element={<ExploreComment />} />
      </Routes>
    </div>
  );
};
