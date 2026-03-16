import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Bienvenido a Feedgames",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Suspense>{children}</Suspense>;
}
