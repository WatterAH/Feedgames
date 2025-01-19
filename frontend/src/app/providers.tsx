"use client";
import React from "react";
import store from "@/store/store";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { UserProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { CookiesProvider } from "react-cookie";
import { AuthReminderProvider } from "@/context/AuthReminderProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <CookiesProvider>
          <Provider store={store}>
            <AuthReminderProvider>{children}</AuthReminderProvider>
            <Toaster richColors position="top-center" />
          </Provider>
        </CookiesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
