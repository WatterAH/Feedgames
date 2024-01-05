import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "../components/Menu/Menu";
import { MainFeed } from "./MainFeed";
import { Create } from "../components/CreateBlog/Create";
import { Saved } from "../components/Saved/Saved";
import { useUser } from "../context/AuthContext";
import { Explore } from "../components/Explore/Explore";
import { ExploreProfile } from "../components/Profile/ExploreProfile";
import { checkAuth } from "../Api/auth";
import { LoadingPage } from "../components/LoadingPage";

export let displayContent;
export let explorerContent;

export const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const content = params.get("content");
  const id = params.get("id");
  const { login, user } = useUser();
  const [currentContent, setCurrentContent] = useState(
    content ? "Explore" : "Feed"
  );
  const [contentType, setContentType] = useState(content || "");
  const [explorerId, setExplorerId] = useState(id);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  displayContent = (tab) => {
    setCurrentContent(tab);
  };

  explorerContent = (content, id) => {
    setContentType(content);
    setExplorerId(id);
    setCurrentContent("Explore");
  };

  const handleToken = async () => {
    try {
      setLoading(true);
      const data = await checkAuth();
      login(data);
      nav("/");
    } catch (error) {
      nav("/auth");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  const renderContent = () => {
    switch (currentContent) {
      case "Feed":
        return <MainFeed />;
      case "Explore":
        return <Explore contentType={contentType} id={explorerId} />;
      case "Create":
        return <Create />;
      case "Profile":
        return <ExploreProfile id={user.id} />;
      case "Saved":
        return <Saved />;
      default:
        return <MainFeed />;
    }
  };

  return loading ? (
    <div className="h-screen flex items-center justify-center">
      <LoadingPage />
    </div>
  ) : (
    <div className="flex relative dark:bg-black duration-500">
      <section className="lg:w-64 w-full bottom-0 lg:top-0 py-6 px-3 fixed bg-white dark:bg-black duration-500 border-r border-t lg:border-t-0 z-10">
        <h2 className="text-3xl text-gray-900 dark:text-white duration-500 font-bold font-kalnia hidden lg:block">
          Feedgames
        </h2>
        <Menu currentContent={currentContent} />
      </section>
      {renderContent()}
    </div>
  );
};
