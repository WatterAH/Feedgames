"use client";
import React, { useEffect, useState } from "react";
import "../globals.css";
import Menu from "@/layout/Menu/Menu";
import New from "@/components/New/New";
import { useToken } from "@/hooks/useAuth";
import {
  useSubscribeToNewPosts,
  useSubscribeToNotify,
} from "@/hooks/useSupabaseEvents";
import { useUser } from "@/context/AuthContext";
import { useSpring, animated } from "react-spring";
import Header from "@/layout/Menu/Header";
import Create from "@/components/New/Create";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { loading } = useToken();
  const { user } = useUser();
  const [loader, setLoader] = useState(loading);
  const [creating, setCreating] = useState(false);
  useSubscribeToNewPosts(user.id);
  useSubscribeToNotify(user.id);

  const loaderSpring = useSpring({
    transform: loading ? "translateY(0)" : "translateY(-100%)",
    opacity: loading ? 1 : 0,
    config: { tension: 280, friction: 60 },
  });

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setLoader(false);
      }, 500);
    }
  }, [loading]);

  return loader ? (
    <animated.div
      style={loaderSpring}
      className="h-screen flex items-center justify-center"
    >
      <h1 className="font-pacifico text-5xl dark:text-white">Fg</h1>
    </animated.div>
  ) : (
    <>
      <main className="flex flex-col h-screen justify-start items-center bg-white lg:bg-barcelona dark:bg-coal relative">
        <Header />
        {children}
        <Menu setCreating={setCreating} />
      </main>
      <New setCreating={setCreating} />
      <Create open={creating} setOpen={setCreating} />
    </>
  );
}
