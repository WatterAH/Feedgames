"use client";
import React from "react";
import "../globals.css";
import Menu from "@/components/Menu/Menu";
import { useToken } from "@/hooks/useToken";
import PageLoader from "@/components/Global/PageLoader";

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
    </>
  );
}
