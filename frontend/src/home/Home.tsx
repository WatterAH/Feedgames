import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import { useCookies } from "react-cookie";
import logo from "../assets/img/logo.png";
import { useRiot } from "../context/RiotContext";

export const Home = () => {
  const { login: loginUser } = useUser();
  const { login: loginRiot } = useRiot();
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies();
  const location = useLocation();
  const path = location.pathname.toLocaleLowerCase();
  const pathData = path.split("/");
  const nav = useNavigate();

  const handleToken = async () => {
    try {
      setLoading(true);
      const data = await checkAuth(cookies.token, cookies.riotToken);
      const { user, riot } = data;
      loginUser(user);
      loginRiot(riot);
      setLoading(false);
    } catch (error) {
      if (pathData[1] && pathData[2]) {
        nav(`/auth?content=${pathData[1]}&id=${pathData[2]}`);
      } else if (pathData[1]) {
        nav(`/auth?content=${pathData[1]}`);
      } else {
        nav("/auth");
      }
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  return loading ? (
    <div className={`h-screen flex items-center justify-center dark:bg-black`}>
      <LoadingPage />
    </div>
  ) : (
    <div className="flex relative dark:bg-black duration-500">
      <section className="lg:w-64 w-full bottom-0 lg:top-0 py-6 px-3 fixed bg-white dark:bg-black duration-500 dark:border-neutral-800 lg:border-r border-t lg:border-t-0 z-10">
        <header className="px-3">
          <h2 className="text-3xl text-gray-900 dark:text-white duration-500  font-pacifico hidden lg:block">
            Feedgames
          </h2>
        </header>
        <Menu />
      </section>
      <Routes>
        <Route path="*" element={<MainFeed />} />
        <Route path="/" element={<MainFeed />} />
        <Route path="/create" element={<Create />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/u/:id" element={<Profile />} />
        <Route path="/p/:id" element={<ExplorePost />} />
        <Route path="/c/:id" element={<ExploreComment />} />
      </Routes>
    </div>
  );
};
