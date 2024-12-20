"use client";
import React from "react";
import store from "@/store/store";
import { UserProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <CookiesProvider>
        <Provider store={store}>
          {children}
          <Toaster richColors position="top-center" />
        </Provider>
      </CookiesProvider>
    </UserProvider>
  );
}
