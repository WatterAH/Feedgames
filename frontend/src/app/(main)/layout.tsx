"use client";
import React, { useState } from "react";
import "../globals.css";
import New from "@/components/New/New";
import Menu from "@/layout/Menu/Menu";
import Create from "@/components/New/Create";
import Header from "@/layout/Menu/Header";
import { useUser } from "@/context/AuthContext";
import { useToken } from "@/hooks/useAuth";
import { defaultUser } from "@/interfaces/User";
import { useSpring, animated } from "react-spring";
import { useSubscribeToUpdates } from "@/hooks/useSupabaseEvents";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { loading } = useToken();
  const { user } = useUser();
  const [loader, setLoader] = useState(true);
  const [creating, setCreating] = useState(false);

  useSubscribeToUpdates(user.id);

  const AnimatedDiv: React.FC<React.PropsWithChildren<any>> = animated.div;
  const loaderSpring = useSpring({
    transform: loading ? "translateY(0)" : "translateY(-100%)",
    opacity: loading ? 1 : 0,
    config: { tension: 300, friction: 50 },
    onRest: () => {
      if (!loading) {
        setTimeout(() => {
          setLoader(false);
        }, 200);
      }
    },
  });

  return loader ? (
    <AnimatedDiv
      style={loaderSpring}
      className="h-screen flex items-center justify-center duration-500"
    >
      <h1 className="font-pacifico text-5xl text-text">Fg</h1>
    </AnimatedDiv>
  ) : (
    <>
      <main className="flex flex-col h-screen justify-start items-center relative">
        <Header />
        {children}
        <Menu setCreating={setCreating} />
      </main>

      {user.id !== defaultUser.id && <New setCreating={setCreating} />}
      <Create open={creating} setOpen={setCreating} />
    </>
  );
}
