"use client";
import React from "react";
import "../globals.css";
import New from "@/components/New/New";
import Menu from "@/components/Menu/Menu";
import Loader from "@/components/Global/Loader";
import { useToken } from "@/hooks/useAuth";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { loading } = useToken();

  return loading ? (
    <div className="h-screen flex items-center justify-center">
      <Loader size="large" color="dark" />
    </div>
  ) : (
    <>
      {children}
      <Menu />
      <New />
    </>
  );
}
