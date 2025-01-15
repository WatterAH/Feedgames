"use client";
import React from "react";
import store from "@/store/store";
import { UserProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { AuthReminderProvider } from "@/context/AuthReminderProvider";
import ThemeProvider from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <CookiesProvider>
        <ThemeProvider>
          <Provider store={store}>
            <AuthReminderProvider>{children}</AuthReminderProvider>
            <Toaster richColors position="top-center" />
          </Provider>
        </ThemeProvider>
      </CookiesProvider>
    </UserProvider>
  );
}
