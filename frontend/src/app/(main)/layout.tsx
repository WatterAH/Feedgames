"use client";
import React from "react";
import "../globals.css";
import Loader from "@/components/Global/Loader";
import Menu from "@/layout/Menu/Menu";
import New from "@/layout/New/New";
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
