"use client";
import React from "react";
import { UserProvider } from "@/context/AuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
