"use client";
import React from "react";
import { UserProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      {children}
      <Toaster richColors position="top-center" />
    </UserProvider>
  );
}
