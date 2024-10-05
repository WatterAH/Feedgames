"use client";
import React from "react";
import "../globals.css";
import Menu from "@/components/Menu/Menu";
import PageLoader from "@/components/Global/PageLoader";
import Create from "@/components/Menu/Create";
import { useToken } from "@/hooks/useAuth";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { loading } = useToken();

  return loading ? (
    <div className="h-screen flex items-center justify-center">
      <PageLoader />
    </div>
  ) : (
    <>
      <Menu />
      {children}
      <Create />
    </>
  );
}
