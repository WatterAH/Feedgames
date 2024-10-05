"use client";
import React from "react";
import { UserProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { CookiesProvider } from "react-cookie";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <CookiesProvider>
        {children}
        <Toaster richColors position="top-center" />
      </CookiesProvider>
    </UserProvider>
  );
}
